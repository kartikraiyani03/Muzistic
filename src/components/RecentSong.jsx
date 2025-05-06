/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { useContext, useEffect } from 'react'
import { playHandler, pauseHandler } from '../redux/slice/songPlayerSlice'
import React from 'react'
import usePlayback from '../utils/usePlayback'
import { AudioContext } from '../context/AudioContext';
import { FaChevronRight } from "react-icons/fa6";


const RecentSong = ({ value, isSongPlaying }) => {

  let dispatch = useDispatch()
  let { songId, isPlaying, songPath, songObject } = useSelector((state) => state.songPlayer)
  let { playSong, pauseSong, audio } = useContext(AudioContext)


  return (
    <div className="flex justify-between py-2 px-3 pr-5 my-1 hover:bg-zinc-900" key={value.id}>
      <div className="flex gap-4 itesm-center">
        <div className="text-gray text-md font-bold flex items-center">{value?.number}</div>
        <div className="flex gap-3">
          <img className='h-[40px]' src={value.poster} alt="" />
          <div className="">
            <h1 className='text-white font-bold text-[15px]'>{value.songName}</h1>
            <p className='text-sm text-gray font-semibold'>{value.artist}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        {
          isSongPlaying ?
            <FaCirclePause onClick={() => pauseSong()} className='text-red text-[30px]' />
            :
            <FaCirclePlay onClick={() => playSong(`src/assets/songs/${value.id}.mp3`, value.id, value.poster, value.artist, value.songName, value.index)} className='text-red text-[30px]' />
        }
      </div>
      <audio ref={audio} />
    </div>
  )
}

export default RecentSong