/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { IoMdMic } from "react-icons/io";
import data from '../data/artistData.json'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { artistClickHandler } from '../redux/slice/songPlayerSlice';
import songs from '../data/lastListen.json'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import { FaCirclePlay } from "react-icons/fa6";
import usePlayback from '../utils/usePlayback';
import { TbBrandGooglePodcasts } from "react-icons/tb";
import { AudioContext } from '../context/AudioContext';
import Card from '../components/Card';

const Explore = () => {

    let dis = useDispatch()
    let nav = useNavigate()
    let { songId, isPlaying } = useSelector((state) => state.songPlayer)
    let { playSong, pauseSong } = useContext(AudioContext)
    let [searchTerm, setSearchTerm] = useState('')
    let [filterData, setFilterData] = useState([])
    let [artistData, setArtistData] = useState(data.artists)

    let songitem = songs.songitem
    let songitem2 = songs.songitem2
    let artists = data.artists

    let songSearchChangeHandler = (e) => {
        let term = e.target.value
        setSearchTerm(term)
        if (term === '') {
            setFilterData([])
        }
        else {
            setSearchTerm(term)
            let result = songitem.filter((song) => song.songName.toLowerCase().includes(term.toLowerCase())
            )
            let result2 = songitem2.filter((song) =>
                song.songName.toLowerCase().includes(term.toLowerCase())
            );
            let finalResult = [...result, ...result2,]
            setFilterData(finalResult)
        }
    }

    let artistSearchChangeHandler = (e) =>
    {
        let term = e.target.value
        setSearchTerm(term)
        let result3 = artists.filter((artist) => artist.artistName.toLowerCase().includes(term.toLowerCase()))
        setFilterData(result3)
    }

    let clickHandler = (artist) => {
        nav(`/artist/${artist.id}`)
        dis(artistClickHandler(artist))
    }
    return (
        <div className='text-white pt-[100px] bg-black relative overflow-hidden'>
            <h1 className='text-start font-semibold text-xl ml-4'>Explore According to you !!</h1>
            <div className="flex justify-center items-center">
                <div className="w-11/12 my-3 rounded-xl flex justify-around items-center bg-zinc-900 h-[50px] ">
                    <input onChange={songSearchChangeHandler} placeholder='Listen Something New....' className='ml-3 h-[40px] placeholder:text-md text-md w-9/12 outline-none bg-transparent' type="te xt" />
                    <IoMdMic className='text-2xl ' />
                </div>
            </div>

            <div className="bg-black">
                <div className="grid grid-cols-2 px-2 place-items-center">
                    {
                        filterData.map((value) => {
                            let isSongPlaying = songId === value.id && isPlaying
                            return (
                                <Card value={value} isSongPlaying={isSongPlaying} key={value.id} />
                            )
                        })
                    }
                </div>
            </div>
            <div className="bg-black pb-[150px] ">
                <h1 className='mt-3 ml-4 font-semibold '>Explore According to Artist</h1>
                <div className="mt-2 w-full grid grid-cols-3 place-items-center">
                    {
                        artistData.map((value) => {
                            return (
                                <div className="my-2" onClick={() => clickHandler(value)} key={value.id}>
                                    {/* <NavLink className='shrink-0' to="/artist/:id" > */}
                                    <div className="bg-zinc-900 cursor-pointer hover:bg-zinc-800 z-30 p-3 rounded-xl">
                                        <img src={value.poster} className='h-[80px] w-[80px] rounded-full object-cover' alt="" />
                                        <h1 className='mt-3 text-center font-semibold text-white text-[12px]'>{value.artistName}</h1>
                                    </div>
                                    {/* </NavLink> */}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Explore