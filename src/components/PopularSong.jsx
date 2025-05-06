/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { playHandler, pauseHandler } from '../redux/slice/songPlayerSlice'
import { useEffect } from 'react'
import { FaCirclePlay, FaCirclePause } from 'react-icons/fa6'
import usePlayback from '../utils/usePlayback'
import { AudioContext } from '../context/AudioContext'

const PopularSong = ({isSongPlaying, value }) => {

    let dispatch = useDispatch()
    let { songId, isPlaying, songPath } = useSelector((state) => state.songPlayer)
    let {playSong, pauseSong, nextSong, prevSong, audio} = useContext(AudioContext)


    return (
        <div className="relative group shrink-0">
            <img className=" h-[120px] aspect-square flex-shrink-0" src={value.poster} alt="" />
            <div className="">
                <h1 className='text-sm font-semibold text-center pt-2'>{value.songName}</h1>
                <p className='text-[12px] text-center text-gray'>{value.artist}</p>
            </div>
            <div className={`${isSongPlaying ? "block" : "hidden group-hover:block"}`}>
                {
                    isSongPlaying ?
                        <FaCirclePause onClick={() => pauseSong()} className='text-3xl absolute top-[3rem] left-[3rem]' />
                        :
                        <FaCirclePlay onClick={() => playSong(`src/assets/songs/${value.id}.mp3`, value.id, value.poster, value.artist, value.songName, value.index)} className='text-3xl absolute top-[3rem] left-[3rem]' />
                }
            </div>
            <audio ref={audio} />
        </div>
    )
}

export default PopularSong