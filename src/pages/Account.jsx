/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import setLogin from '../redux/slice/accountSlice'
import { GoAlert } from "react-icons/go";
import { NavLink, useNavigate } from 'react-router-dom';
import account from '../../public/songImg/account.jpg'
import { IoMdArrowBack } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa6";
import {playListClickHandler} from '../redux/slice/playListSlice'

const Account = () => {

  let { userObject, login } = useSelector((state => state.account))
  let { playListObject } = useSelector((state) => state.playlist)
  let nav = useNavigate()
  let { allPlayList, likeList } = useSelector((state) => state.playlist)
  let dis = useDispatch()

  let navHandler = () => {
    nav(-1)
  }

  let playListNavHandler = (value) => {
    console.log(value)
    dis(playListClickHandler(value))
    nav(`/playlist/${value?.pid}`)
  }

  return (
    <div className='pt-[60px] min-h-[100vh] pb-[150px] text-white bg-gradient-to-t from-zinc-900 via-zinc-900 to-black'>
      {
        login
          ? (
            <div className="px-3 ">
              <IoMdArrowBack className='text-start relative top-3 text-3xl' onClick={navHandler} />
              <div className="w-full mb-6">
                <img src={account} className='mx-auto rounded-full h-[120px]' alt="" />
                <h1 className='text-center font-semibold text-2xl my-3'>{userObject.name}</h1>
                <button
                  className="flex mx-auto w-5/12 justify-center border-2 border-red rounded-3xl 
            bg-transparent px-3 py-1 text-sm/6 font-semibold text-red shadow-sm hover:bg-red hover:border-red hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                >
                  Edit Profile
                </button>
              </div>
              <div className="flex justify-around items-center my-4">
                <div className="">
                  <h1 className='text-gray  font-semibold text-center'>{allPlayList.length}</h1>
                  <p className='text-gray text-[12px]'>PLAYLIST</p>
                </div>
                <div className="">
                  <h1 className='text-center text-gray font-semibold'>{likeList.length}</h1>
                  <p className='text-[12px] text-gray'>LIKED SONG</p>
                </div>
              </div>
              <div className="mt-4">
                <h1 className='font-semibold text-2xl px-3'>You&apos;r Playlist</h1>
                <div className="mt-4">
                  {
                    allPlayList.length > 0
                      ? (
                        Array.isArray(allPlayList) && allPlayList.map((value) => {
                          console.log(value)
                          return (
                            <div onClick={() => playListNavHandler(value)} className="flex justify-between  bg-zinc-800 py-3 my-2 px-4 pr-5 rounded-md " key={value?.pid}>
                              <div className="flex gap-4  itesm-center">
                                <div className="text-gray text-md font-bold flex items-center">{value?.pid}</div>
                                <div className="flex gap-3 ">
                                  <div className="">
                                    <h1 className='text-white font-bold text-[15px]'>{value?.pname}</h1>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <FaChevronRight />
                              </div>
                            </div>
                          )
                        })
                      )
                      : (
                        <div className="">
                          <div className="bg-zinc-800 text-sm text-gray rounded-md p-3 mx-auto w-full my-3 text-center">
                            <h1 className='mb-4'>CREATE YOU&apos;R FIRST PLAYLIST</h1>

                            <button onClick={() => nav('/library')}
                              className="flex mx-auto w-5/12 justify-center border-2 border-white rounded-md 
                            bg-transparent px-3 py-1 text-sm/6 font-semibold text-white shadow-sm hover:bg-white hover:border-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                            >
                              Create Playlist
                            </button>
                          </div>
                        </div>
                      )
                  }
                </div>
              </div>
            </div>
          )
          : (<div className="flex justify-center h-[60vh] items-center">
            <div className="w-full mx-auto">
              <div className="flex my-4 w-9/12 mx-auto items-center justify-center gap-3">
                <GoAlert className='text-red text-2xl' />
                <h1 className='font-semibold '>Login / Signup </h1>
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

export default Account