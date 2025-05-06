/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import image from '../../public/songImg/a1.jpg'
import { useDispatch, useSelector } from 'react-redux'
import usePlayback from '../utils/usePlayback'
import { FaPauseCircle } from 'react-icons/fa'
import { FaCirclePlay } from 'react-icons/fa6'
import { MdOutlineDelete } from "react-icons/md";
import { removeLike, remove, addPlayListObjectHandler, removePlayListObjectHandler, playListClickHandler } from '../redux/slice/playListSlice'
import { IoAddSharp } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom'
import { GoAlertFill } from "react-icons/go";
import { GoAlert } from "react-icons/go";
import { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { AudioContext } from '../context/AudioContext'

const Library = () => {

  let { allPlayList, likeList, playListObject } = useSelector((state) => state.playlist)
  let { login } = useSelector((state) => state.account)
  let { isPlaying, songId, songObject } = useSelector((state) => state.songPlayer)
  let { playSong, prevSong, pauseSong, nextSong } = useContext(AudioContext)
  let dis = useDispatch()
  let nav = useNavigate()
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [playListData, setPlayListData] = useState({ pid: '', pname: '' })
  let [error, setError] = useState({ pid: '', pname: '' })



  let changeHandler = (e) => {
    const { name, value } = e.target;
    setPlayListData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validate(name, value)
  };



  let newError = { pid: '', pname: '' }
  let validate = (name, value) => {
    switch (name) {
      case 'pid':
        if (!value) {
          newError.pid = 'Id Required'
          setError(newError)
        }
        break;

      case 'pname':
        if (!value) {
          newError.pname = 'Name Required'
          setError(newError)
        }
        break;
      default:
        break;
    }
    setError(newError)
  }

  let validateField = () => {
    let valid = true
    let newError = { pid: '', pname: '' }

    if (!playListData.pid) {
      newError.pid = 'Id Required'
      valid = false
    }
    if (!playListData.pname || playListData.pname === '') {
      newError.pname = 'Name Required'
      valid = false
    }

    setError(newError)
    return valid
  }

  let addPlaylist = (e) => {
    e.preventDefault()
    if (allPlayList.some((playlist) => playlist.pid == playListData.pid)) {
      newError.pid = 'PlayList Already Exist'
      setError(newError)
    }
    else {
      if (Object.values(error).every((error) => error === '') && validateField) {
        dis(addPlayListObjectHandler(playListData))
        setError({ pid: '', pname: '' })
        setIsModalOpen(false);
        setPlayListData({ pid: '', pname: '' })
      }
    }
  }

  let removePlayList = (playListObject) => {
    dis(removePlayListObjectHandler(playListObject))
    console.log("Playlist Removed")
  }


  let removeLikeHandler = (song) => {
    dis(removeLike(song))
    console.log("Like Removed")
  }

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen])

  let clickHandler = (value) => {
    dis(playListClickHandler(value))
    nav(`/playlist/${value.pid}`)
  }

  return (
    <div className='relative bg-black overflow-x-hidden min-h-[100vh] pt-[90px] pb-[20vh]  text-white'>
      {
        login
          ? (
            <div className="">
            {
              <div className={`${isModalOpen ? 'absolute' : 'hidden'} z-50  shadow-red   bg-zinc-950 w-11/12 left-[1rem] top-[13rem] rounded-lg p-5`} >
                {/* <div className="absolute top-0 right-[5rem] w-64 h-64 rounded-full bg-radial-gradient from-red to-transparent blur-[80px] pointer-events-none"></div> */}
                <div className="flex justify-between mb-4 items-center">
                  <h1 className='font-semibold text-xl'>PlayList</h1>
                  <IoClose onClick={() => setIsModalOpen(!isModalOpen)} className='text-3xl' />
                </div>
    
                <div className="">
                  <form action="" className='space-y-5' onSubmit={addPlaylist}>
                    <input type='text' name='pid' value={playListData.pid} onChange={changeHandler} placeholder='Playlist Id' className="block w-full  bg-zinc-900 outline-none  px-3 h-[45px] text-base text-gray-900  border-zinc-700 placeholder:text-gray focus:outline focus:outline-2 rounded-lg focus:border-b-red sm:text-sm/6"
                    /> <span className='text-red text-sm'>{error.pid}</span>

                    <input type='text' name='pname' value={playListData.pname} onChange={changeHandler} placeholder='Playlist Name' className="block w-full bg-zinc-900 outline-none  px-3 h-[45px] text-base text-gray-900  border-zinc-700 placeholder:text-gray rounded-lg focus:outline focus:outline-2  focus:border-b-red sm:text-sm/6"
                    /><span className='text-red text-sm'>{error.pname}</span>

                    <button type='submit'
                      className="flex  w-full justify-center border-2 border-red rounded-md 
                bg-transparent px-3 py-1.5 text-sm/6 font-semibold text-red shadow-sm hover:bg-red hover:border-red hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                    >
                      Create PlayList
                    </button>
                  </form>
                </div>
              </div> 
            }
            
            <div className="">
              <h1 className='text-2xl px-3 font-semibold'>Library</h1>
              <div className="grid my-3  grid-cols-2 place-items-center">
                {
                  Array.isArray(allPlayList) && allPlayList.map((value) => {
                    return (
                      <div className='bg-zinc-900  py-2 flex-col rounded-lg w-[170px] flex justify-center items-center mb-6' key={value.pid}>
                        <div className="" onClick={() => clickHandler(value)}>
                          <p className='text-zinc-200 text-[100px]  ' >{value.pid}</p>
                        </div>
                        <div className="flex justify-between items-center pb-2 w-full px-3">
                          <h1 className='text-[14px] text-white font-semibold'>{value.pname}</h1>
                          <MdOutlineDelete onClick={() => removePlayList(value)} className='text-2xl text-red' />
                        </div>
                      </div>
                    )
                  })
                }
                <div className='' onClick={() => setIsModalOpen(!isModalOpen)}>
                  <div className="bg-zinc-900 rounded-lg h-[180px] w-[170px] flex justify-center items-center">
                    <IoAddSharp className='text-zinc-600 text-[150px]' />
                  </div>
                </div>
    
              </div>
            </div>
    
            <h1 className='text-yellow my-4 px-3 text-[20px] font-semibold'>Liked Song</h1>
            <div className="grid grid-cols-2 place-items-center">
              {
    
                likeList.map((value) => {
                  let isSongPlaying = value.id === songId && isPlaying
                  return (
                    <div className="bg-zinc-900 rounded-lg p-4 my-3 relative group" key={value.id}>
                      <img src={value.poster} className='h-[140px] w-[140px] shrink-0' alt="" />
                      <div className={`transform absolute right-[1rem] bottom-[4rem] ${isSongPlaying} ? 'block' : ' opacity-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300  group-hover:opacity-100 ease-out text-red '`}>
                        {
                          isSongPlaying
                            ? <FaPauseCircle onClick={() => pauseSong()} className={`cursor-pointer text-5xl ${isSongPlaying ? 'block' : 'hidden'}`} />
                            : <FaCirclePlay onClick={() => playSong(`src/assets/songs/${value.id}.mp3`, value.id, value.poster, value.artist, value.songName, value.index)} className='text-5xl cursor-pointer' />
                        }
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="my-2">
                          <h1 className='font-semibold text-[13px]'>{value.songName}</h1>
                          <p className='text-gray text-[10px]'>{value.artist}</p>
                        </div>
                        <div className="">
                          <MdOutlineDelete onClick={() => removeLikeHandler(songObject)} className='text-2xl text-red' />
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              <NavLink to="/explore">
                <div className="bg-zinc-900 rounded-lg h-[180px] w-[170px] flex justify-center items-center">
                  <IoAddSharp className='text-zinc-600 text-[150px]' />
                </div>
              </NavLink>
            </div>
          </div>
        )
        : (
          <div className="flex justify-center h-[60vh] items-center">
            <div className="w-full mx-auto">
              <div className="flex my-4 w-9/12 mx-auto items-center justify-center gap-3">
                <GoAlert className='text-red text-2xl' />
                <h1 className='font-semibold '>Signup for Library Access</h1>
              </div>
              <div className="w-6/12 mx-auto">
                <NavLink to='/signup'>
                  <button
                    className="flex w-full justify-center border-2 border-red rounded-md 
          bg-transparent px-3 py-1.5 text-sm/6 font-semibold text-red shadow-sm  hover:border-red hover:bg-red hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                  >
                    Signup
                  </button>
                </NavLink>
              </div>

            </div>
          </div>
        )
      }

    
    </div>
  )
}

export default Library
