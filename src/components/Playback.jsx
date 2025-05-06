/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FcLikePlaceholder, FcLock } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { AiFillHome } from "react-icons/ai";
import { LuLibrary } from "react-icons/lu";
import { MdWorkspacePremium } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { playHandler, pauseHandler, prevHandler, nextHandler } from '../redux/slice/songPlayerSlice';
import data from '../data/lastListen.json'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import usePlayback from '../utils/usePlayback';
import { MdOutlineExplore } from "react-icons/md";
import { addLike, removeLike } from '../redux/slice/playListSlice';
import toast from 'react-hot-toast';
import { AudioContext } from '../context/AudioContext';


const Playback = ({toggleHandler, login }) => {

  let {songObject, isPlaying, songId} = useSelector((state) => state.songPlayer)
  let [toggle, setToggle] = useState(false)
  let {playSong, audio, prevSong, pauseSong, nextSong} = useContext(AudioContext)
  let {likeList} = useSelector((state) => state.playlist)

    let dis = useDispatch()
  
      let addLikehandler = (song) =>
      {
          dis(addLike(song))
          console.log("Song Liked")
          toast.success("Song Liked")
        }
        
        let removeLikeHandler = (song) =>
          {
            dis(removeLike(song))
            console.log("Like Removed")
            toast.success("Like Removed")
      }
  
 
  return (
    <div className="space-y-0 text-white" >
      <div className={`w-[95%]  ${songObject === null ? 'hidden' : 'block'} transition duration-900 fixed bottom-[60px] z-50 px-3  ml-2 h-[65px] flex justify-between items-center backdrop-blur-2xl rounded-xl border-zinc-700`}>
          <div className='flex gap-3 w-9/12 h-full items-center' onClick={toggleHandler} >
            <div className="">
              <img src={songObject?.poster} className='h-[40px] rounded-sm' alt="img" />
            </div>
            <div className="">
              <h1 className='text-white font-semibold text-[15px]'>{songObject?.songName}</h1>
              <p className='text-gray text-[12px] font-semibold'>{songObject?.artist}</p>
            </div>
          </div>
        <div className="flex transition duration-300 justify-center gap-3 items-center ">
          {
              likeList.some((song) => song.id === songId) 
              ?<FcLike onClick={() => removeLikeHandler(songObject)} className='text-2xl' /> 
              : <FcLikePlaceholder onClick={() => addLikehandler(songObject)} className='text-2xl' />
          }
          <MdSkipPrevious onClick={() => prevSong()} className='cursor-pointer text-3xl transition duration-300' />
          {
            isPlaying ?
              <FaPause className='text-xl cursor-pointer' onClick={() => pauseSong()} />
              :
              <FaPlay className='text-xl cursor-pointer' onClick={() => playSong(songObject.currSongPath, songObject.id, songObject.poster, songObject.artist, songObject.songName, songObject.index)} />
          }
          <MdSkipNext onClick={() => nextSong()} className='text-3xl cursor-pointer' />
        </div>
      </div>
      <div className="fixed flex h-[60px] w-full justify-around items-center bg-gradient-to-t from-black to-transparent bottom-0 ">
        <NavLink to='/'>
          <div className="flex-col items-center">
            <div className="text-center flex items-center justify-center">
              <AiFillHome className='text-2xl' />
            </div>
            <h1 className='font-semibold text-[12px]'>Home</h1>
          </div>
        </NavLink>
        <NavLink to='/library'>
          <div className="">
            <div className="text-center flex items-center justify-center">
              <LuLibrary className='text-2xl' />
            </div>
            <h1 className='text-[12px] font-semibold'>Library</h1>
          </div>
        </NavLink>
        <NavLink to='/explore'>
          <div className="">
            <div className="text-center flex items-center justify-center">
              <MdOutlineExplore className='text-2xl' />
            </div>
            <h1 className='text-[12px] font-semibold'>Explore</h1>
          </div>
        </NavLink>
        <NavLink to='/premium'>
          <div className="">
            <div className="text-center flex items-center justify-center">
              <MdWorkspacePremium className='text-2xl' />
            </div>
            <h1 className='text-[12px] font-semibold'>Premium</h1>
          </div>
        </NavLink>
        { 
            login && <NavLink to='/account'>
            <div className="text-center">
              <div className="text-center flex items-center justify-center">
                <MdAccountCircle className="text-center text-2xl" />
              </div>
              <h1 className="text-center text-[12px] font-semibold">Account </h1>
            </div>
          </NavLink>
          
        }
      </div>
      <audio ref={audio} />
    </div>
  )
}

export default Playback