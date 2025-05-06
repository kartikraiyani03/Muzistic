/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AudioContext } from '../context/AudioContext'
import { useContext } from 'react'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import { FaCirclePlay } from "react-icons/fa6";


const Card = ({value, isSongPlaying}) => {

    let { playSong, pauseSong, audio } = useContext(AudioContext)
    let { songObject, songId } = useSelector((state) => state.songPlayer)

    return (
        <div className="px-4 group hover:bg-zinc-800  pt-4 pb-2 rounded-lg my-2 bg-zinc-900" key={value.id}>
            <div className="relative">
                <img className='h-[130px] w-[130px]' src={value.poster} alt="" />
                <div className={`right-0  bottom-0 text-red absolute ${isSongPlaying ? 'block ' : ' opacity-0 transform translate-y-full right-0  bottom-0 group-hover:translate-y-0 transition-transform duration-300  group-hover:opacity-100 ease-out text-red '} `} >
                    {
                        isSongPlaying
                            ? <FaPauseCircle onClick={() => pauseSong()} className={`cursor-pointer text-5xl ${isSongPlaying ? 'block' : 'hidden'}`} />
                            : <FaCirclePlay onClick={() => playSong(`src/assets/songs/${value.id}.mp3`, value.id, value.poster, value.artist, value.songName, value.index)} className='text-5xl cursor-pointer' />
                    }
                </div>
            </div>
            <div className="my-2">
                <h1 className='font-semibold text-[15px]'>{value.songName}</h1>
                <p className='text-[14px]  text-gray '>{value.artist}</p>
            </div>
        </div>
    )
}

export default Card