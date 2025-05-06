/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
import { useContext, useEffect } from 'react'
import { playHandler, pauseHandler } from '../redux/slice/songPlayerSlice'
import React, { useRef, useState } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { AudioContext } from '../context/AudioContext';


const ArtistSong = ({ value, isSongPlaying, artist }) => {

    let {pauseSong, playSong, audio} = useContext(AudioContext)
    let dispatch = useDispatch()
    // let audio = useRef(null)
    let { songId, isPlaying, songPath, songObject } = useSelector((state) => state.songPlayer)
    // let playSong = (currSongPath, id, poster, artist, songName, index) => {
    //     if (!audio.current) {
    //         audio.current = new Audio(currSongPath)
    //     }
    //     if (isPlaying) {
    //         dispatch(pauseHandler())
    //         audio.current.pause()
    //     }
    //     if (songId === id) {
    //         if (isPlaying) {
    //             dispatch(pauseHandler())
    //             audio.current.pause()
    //             // console.log(isPlaying)
    //         }
    //         else {
    //             dispatch(playHandler({ currSongPath, id, poster, artist, songName, index }))
    //             audio.current.play()
    //             // console.log(isPlaying)
    //         }
    //     }
    //     else {
    //         if (audio.current) {
    //             dispatch(pauseHandler())
    //             audio.current.pause()
    //             // console.log(isPlaying)
    //         }
    //         audio.current.src = currSongPath
    //         dispatch(playHandler({ currSongPath, id, poster, artist, songName, index }))
    //         audio.current.play()
    //         // console.log(isPlaying)
    //     }
    // }

    // let pauseSong = () => {

    //     dispatch(pauseHandler())
    //     audio.current.pause()
    //     console.log(isPlaying)
    // }
    
    return (
        <div className="flex py-2 justify-between items-center">
            <div className="flex items-center" >
                <div className="flex gap-x-4 items-center" >
                    <h1 className='text-gray font-semibold'>{value.id}</h1>
                    <div className="flex items-center gap-x-3">
                        <img src={value.photo} className='h-[45px] w-[45px] object-cover' alt="" />
                        <div className="">
                            <h1 className='font-semibold'>{value.songName}</h1>
                            <p className='text-sm text-gray'>{
                                value.numberOfListens >= 1000000
                                    ? (value.numberOfListens / 1000000).toFixed(1) + "M"
                                    : value.numberOfListens >= 1000
                                        ? (value.numberOfListens / 1000).toFixed(1) + "K"
                                        : value.numberOfListens
                            }</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Icon Section  */}
            <div className="flex gap-x-4" key={value.id}>
                {
                    isSongPlaying
                        ? <FaPause onClick={() => pauseSong()} className='text-2xl ' />
                        : <FaPlay onClick={() => playSong(value.photo.replace("songImg", "songs").replace(".jpg", ".mp3")
                            , value.id, value.photo, artist, value.songName, value?.index)} className='text-xl ' />
                }
                <CiMenuKebab className='text-xl' />
            </div>
            <audio src={audio} />
        </div>
    )
}

export default ArtistSong