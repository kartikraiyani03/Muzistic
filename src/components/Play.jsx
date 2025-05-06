/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { RiPlayListLine } from "react-icons/ri";
import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import { IoMdShare } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
import { add, remove, addLike, removeLike } from '../redux/slice/playListSlice'
import { useDispatch } from 'react-redux';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { AudioContext } from '../context/AudioContext';
import { IoCloseCircle } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";



const Play = ({open, setOpen, toggleHandler, bar, setBar, barHandler }) => {

    let { isPlaying, songId, artistObject, songObject, songs } = useSelector((state) => state.songPlayer)
    let { allPlayList, likeList } = useSelector((state) => state.playlist)
    let {audio, playSong, pauseSong, prevSong, nextSong, formTime, timeUpdateHandler, durationUpdateHandler, seekHandler, progressBarWidth, currTime, duration } = useContext(AudioContext)

    useEffect(() => {
        if (open || bar) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = 'auto'
        }
    }, [open, bar])


    let dis = useDispatch() 

    let addLikehandler = (song) => {
        dis(addLike(song))
        console.log("Song Liked")
        toast.success("Song Liked")
    }

    let removeLikeHandler = (song) => {
        dis(removeLike(song))
        console.log("Like Removed")
        toast.success("Like Removed")
    }

    return (
        <div className={`pt-3 flex-col items-center overflow-auto justify-center text-white transform fixed bottom-0 left-0 ${open ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-500 ease-in-out z-50 h-full w-full p-2 bg-gradient-to-t from-black via-zinc-900 to-zinc-900`}>
            <div className="flex justify-between items-center">
                <IoIosArrowDown className='text-white text-[30px]' onClick={() => toggleHandler()} />
                <h1 className='text-zinc-300 text-sm text-center'>PLAYING SONG</h1>
                <AiOutlineMenu className='text-white text-[25px]' />
            </div>
            <div className="mt-[30px] flex justify-center items-center">
                <img className='rounded-md h-[320px] w-[320px] object-cover' src={songObject?.poster} alt="" />
            </div>
            <div className="flex mt-6 mb-7 mx-5 justify-between items-center">
                <div className="">
                    <h1 className='text-white font-semibold text-xl'>{songObject?.songName}</h1>
                    <p className='text-zinc-500 font-semibold mt-1 text-[15px]'>{songObject?.artist}</p>
                </div>
                <div className="flex justify-center gap-x-4 items-center">
                    {
                        likeList.some((song) => song.id === songId)
                            ? <FcLike onClick={() => removeLikeHandler(songObject)} className='text-3xl cursor-pointer' />
                            : <FcLikePlaceholder onClick={() => addLikehandler(songObject)} className='text-3xl cursor-pointer' />
                    }
                    {
                        bar 
                        ? <IoCloseCircleOutline onClick={barHandler} className='text-white text-3xl cursor-pointer'/>
                        : <IoAddCircleOutline onClick={barHandler} className='text-white text-3xl cursor-pointer' />
                    }
                </div>

            </div>
            <div className="">
                <div className="relative cursor-pointer rounded-xl w-[310px] mx-auto bg-zinc-800 h-1" onClick={seekHandler}>
                    <div className={` bg-white h-1 top-0 rounded-xl`}
                        style={{ width: `${progressBarWidth}%` }}>
                        <div className={`absolute h-3 -top-1 w-3 rounded-full bg-white`}
                            style={{
                                left: `calc(${progressBarWidth}% - 6px)`
                            }} ></div>
                    </div>
                </div>
                <div className="flex justify-between items-center mx-5 mt-1 text-[14px]">
                    <p>{formTime(currTime)}</p>
                    <p>{formTime(duration)}</p>
                </div>
            </div>
            <div className="flex mx-auto w-10/12 mt-4 justify-between items-center">
                <RiPlayListLine className='text-2xl' />
                <MdSkipPrevious onClick={() => prevSong(songObject?.index)} className='text-3xl cursor-pointer' />
                {
                    isPlaying
                        ? <FaPauseCircle className='text-5xl cursor-pointer' onClick={() => pauseSong()} />
                        : <FaPlayCircle onClick={() => playSong(songObject.songPath, songObject.id, songObject.poster, songObject.artist, songObject.songName, songObject.index)} className='text-5xl cursor-pointer' />
                }
                <MdSkipNext onClick={() => nextSong(songObject?.index)} className='text-3xl cursor-pointer' />
                <IoMdShare className='text-2xl cursor-pointer' />
            </div>
            <div className="AI"></div>
            <audio ref={audio} onTimeUpdate={timeUpdateHandler} onLoadedMetadata={durationUpdateHandler} />
        </div>
    )
}

export default Play