/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { IoAddCircleOutline } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
import { add, remove,playListArrayClickHandler } from '../redux/slice/playListSlice';

const AddToPlayList = ({ bar, setBar, barHandler }) => {

  let { allPlayList, playListObject } = useSelector((state) => state.playlist)
  let { songObject } = useSelector((state) => state.songPlayer)
  let dis = useDispatch()


  let addHandler = (playListObj, songObject) => 
  {
    dis(add({playListObj, songObject}))
}

let removeHandler = (song) => {
    dis(remove(song))
    console.log("Song Removed")
}

  return (
    <div className={`p-3 rounded-t-md flex-col items-center overflow-auto justify-center text-white transform fixed bottom-0 left-0 ${bar ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-500 ease-in-out z-50 w-full p-2 bg-gradient-to-t from-black via-zinc-900 to-zinc-800`}>

      <div className="flex justify-between items-center">
        <h1 className='text-sm text-gray'>SELECT PLAYLIST TO ADD</h1>
        <IoIosArrowDown className='text-white cursor-pointer text-[30px]' onClick={() => barHandler()} />
      </div>
      <div className="p-2">
        {
          allPlayList?.map((playListObj) => {

            return (
              <div className="flex hover:bg-zinc-900 rounded-lg justify-between p-2 items-center " key={playListObj.pid}>
                <div className="flex  justify-center gap-4 items-center">
                  <h1 className='text-gray font-bold '>{playListObj.pid}</h1>
                  <h1 className='text-semibold text-white text-xl'>{playListObj.pname}</h1>
                </div>
                {
                  allPlayList?.some((playlistObj) =>
                    playlistObj?.playlist?.some((song) => song.id === songObject.id)
                  )
                    ? <IoCheckmarkCircle  className='text-white text-3xl cursor-pointer' />
                    : <IoAddCircleOutline onClick={() => addHandler(playListObj, songObject)} className='text-white text-3xl cursor-pointer' />
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AddToPlayList