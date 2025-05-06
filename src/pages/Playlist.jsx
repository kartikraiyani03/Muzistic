/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import image from '../../public/songImg/a1.jpg'
import { useDispatch, useSelector } from 'react-redux'
import usePlayback from '../utils/usePlayback'
import { FaPauseCircle } from 'react-icons/fa'
import { FaCirclePlay } from 'react-icons/fa6'
import { MdOutlineDelete } from "react-icons/md";
import { removeLike, remove } from '../redux/slice/playListSlice'
import { IoAddSharp } from "react-icons/io5";
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { GoAlertFill } from "react-icons/go";
import { GoAlert } from "react-icons/go";
import { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { AudioContext } from '../context/AudioContext'
import { IoMdArrowBack } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";

const Playlist = () => {

  let { allPlayList, likeList, playListObject } = useSelector((state) => state.playlist)
  let { login } = useSelector((state) => state.account)
  let { isPlaying, songId, songObject } = useSelector((state) => state.songPlayer)
  console.log(allPlayList)
  let { playSong, pauseSong, audio } = useContext(AudioContext)
  let dis = useDispatch()
  let nav = useNavigate()
  let { pid } = useParams()

  let currPlayList = allPlayList.find((playlist) => playlist?.pid === playListObject?.pid)
  console.log(currPlayList)

  if (!currPlayList) {
    return <div className="h-[100vh] flex justify-center items-center">
      <h1 className="text-white font-semibold text-3xl">PlayList Not Found</h1>
    </div>
  }

  let removeHandler = (song, currPlayList) => {
    dis(remove({currPlayList,song}))
  }

  let removeLikeHandler = (song) => {
    dis(removeLike(song))
    console.log("Like Removed")
  }

  let navBackHandler = () => {
    nav(-1)
  }

  return (
    <div className='pt-[90px] pb-[100px] min-h-[100vh]'>
      <h1 className='text-white text-xl font-semibold my-5 mx-4'>Welcome to {playListObject?.pname} !!!</h1>
      <IoMdArrowBack onClick={() => navBackHandler()} className="absolute top-[4.5rem] left-2 text-[35px] text-white rounded-full z-20 bg-transparent p-1 cursor-pointer" />

      <div className="grid px-3 grid-cols-2 place-items-center">
        {
          currPlayList?.playlist?.length > 0
            ? (
              currPlayList?.playlist?.map((song) => {
                console.log("playList Length " + currPlayList.playlist.length)

                let isSongPlaying = song?.songIdng === songId && isPlaying
                return (
                  <div className="bg-zinc-900 rounded-lg p-3 my-3 relative " key={song?.id}>
                    <div onClick={() => removeHandler(song, currPlayList)} className="flex absolute right-2 ">
                      <IoClose className='text-white text-2xl cursor-pointer' />
                    </div>
                    <div className="group">
                      <img src={song?.poster} className='h-[140px] w-[140px] shrink-0' alt="" />
                      <div className={`transform absolute right-[1rem] bottom-[4rem] ${isSongPlaying} ? 'block' : ' opacity-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300  group-hover:opacity-100 ease-out text-red '`}>
                        {
                          isSongPlaying
                            ? <FaPauseCircle onClick={() => pauseSong()} className={`cursor-pointer text-5xl ${isSongPlaying ? 'block' : 'hidden'}`} />
                            : <FaCirclePlay onClick={() => playSong(`src/assets/songs/${song?.id}.mp3`, song.id, song?.poster, song?.artist, song?.songName, song?.index)} className='text-5xl cursor-pointer' />
                        }
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="my-2">
                          <h1 className='font-semibold text-white text-[15px]'>{song?.songName}</h1>
                          <p className='text-gray text-[12px] font-semibold'>{song?.artist}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }))
            : (
              <div className="text-white min-h-[50vh]">
                <h1 className="font-semibold text-center my-2 text-xl">Playlist is Empty</h1>
                <NavLink to='/'>
                  <button
                    className="flex w-full justify-center border-2 border-red rounded-md 
            bg-transparent px-3 py-1.5 text-sm/6 font-semibold text-red shadow-sm  hover:border-red hover:bg-red hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                  >
                    Add Song
                  </button>
                </NavLink>
              </div>
            )
        }
      </div>
      <audio ref={audio} />
    </div>
  )
}

export default Playlist