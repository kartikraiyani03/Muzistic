/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import { CiMenuKebab } from "react-icons/ci";
import { RiPlayListLine } from "react-icons/ri";
import { FaCirclePlay, FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { playHandler, pauseHandler } from '../redux/slice/songPlayerSlice';
import { useEffect } from 'react';
import ArtistSong from '../components/ArtistSong';
import usePlayback from '../utils/usePlayback';
import { AudioContext } from '../context/AudioContext';

const ArtistProfile = () => {

  let nav = useNavigate()
  let { songId, isPlaying, songObject, artistObject } = useSelector((state) => state.songPlayer)
  let [follow, setFollow] = useState(false)
  let [animate, setAnimate] = useState(false)
  let {playSong, pauseSong, audio} = useContext(AudioContext)

  let animteHandler = () => {
    setAnimate(true)
    setFollow(!follow)

    setTimeout(() => {
      setAnimate(false)
    }, 30);
  }

  let navBackHandler = () => {
    nav(-1)
  }

  if (!artistObject) {
    return (
      <div className="flex justify-center items-center">
        <h1 className='text-red'>Artist Not found</h1>
      </div>
    )
  }

  let backStyle = {
    backgroundImage: `url(${artistObject.poster})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
  }

  return (
    <div className="text-white pt-[80px] bg-black h-screen z-10">
      <div style={backStyle} className={`relative gradie h-[250px] w-full bg-no-repeat bg-cover`}>
        <div className="object-cover bg-no-repeat bg-cover">
        </div>
        <IoMdArrowBack onClick={() => navBackHandler()} className="absolute top-2 left-2 text-[35px] text-white rounded-full z-20 bg-transparent p-1 cursor-pointer" />
        <h1 className='absolute bottom-0 font-bold  text-[35px] bg-transparent left-3'>{artistObject.artistName}</h1>
      </div>
      {/* Photo Section  */}
      <div className="p-3 bg-gradient-to-t from-black via-black to-zinc-800">
        <div className="">
          <h1 className='text-gray text-sm font-semibold'>{artistObject.monthlyListeners >= 1000000
            ? (artistObject.monthlyListeners / 1000000).toFixed(1) + "M"
            : artistObject.monthlyListeners >= 1000
              ? (artistObject.monthlyListeners / 1000).toFixed(1) + "K"
              : artistObject.monthlyListeners
          } Monthly Listeners</h1>
        </div>
        {/* Following Section  */}
        <div className="flex mt-4 justify-between items-center">
          <div className="flex justify-between items-center w-5/12">
            <button className={`text-md border-2 py-[3px] w-[100px] rounded-md ${!animate ? '' : 'animate-ping duration-300'}`}
              onClick={animteHandler}>
              {
                follow
                  ? "Following"
                  : "Follow"
              }
            </button>
            <CiMenuKebab className='text-2xl' />
          </div>
          <div className="flex justify-end gap-x-5 text-red items-center">
            <RiPlayListLine className='text-2xl' />
            <FaCirclePlay className='text-[40px]' />
          </div>
        </div>
        {/* Popular Section   */}
        <div className="">
          <h1 className='font-bold ml-2 my-3 text-2xl'>Popular</h1>
          <div className="">
            {
              
              artistObject.popularSongs.map((value) => {
                let artist = artistObject.artistName
                let isSongPlaying = songId === value.id && isPlaying
                return (
                  <div className="" key={value.id}>
                    <ArtistSong artist={artist} value={value} isSongPlaying={isSongPlaying} audio={audio} />
                  </div>
                )
              })
            }
          </div>
          {/* Album section  */}
          <div className="py-5 mb-[80px]">
            <h1 className='font-bold ml-2 text-2xl'>Popular Release</h1>
            <div className="flex text-white justify-start gap-x-6 overflow-x-auto scrollbar-hidden items-center mx-2 py-4">
              {
                artistObject.albums.map((value) => {
                  let isSongPlaying = songId === value.id && isPlaying
                  return (
                    <div className="shrink-0 group relative" key={value.id}>
                      <img src={value.photo} className=' h-[120px]' alt="" />
                      <h1 className='text-center font-semibold text-sm py-1'>{value.name}</h1>
                      <div className={`${isSongPlaying} ? 'block' : 'hidden group-hover:block'`}>
                        {
                          isSongPlaying
                            ? <FaPause onClick={() => pauseSong()} className={`absolute ${isSongPlaying ? 'block' : 'hidden'} top-[2.8rem] left-[2.8rem] text-3xl group-hover:block hidden`} />
                            : <FaPlay onClick={() => playSong(value.photo.replace('jpg', 'mp3'), value.id, value.photo, value?.artist, value.songName, value?.index)} className={`absolute top-[3rem] left-[3rem] text-2xl group-hover:block hidden`} />
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <audio ref={audio} />
    </div >
  )
}

export default ArtistProfile