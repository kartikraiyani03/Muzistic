/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import data from '../data/lastListen.json'
import { useSelector } from 'react-redux';
import PopularSong from './PopularSong';
import { AudioContext } from '../context/AudioContext';


const Popular = () => {

  let { songId, isPlaying, songPath } = useSelector((state) => state.songPlayer)


  return (
    <div className='pt-[30px] px-3 bg-black w-full'>
      <div className="">
        <div className="">
          <h1 className='text-white font-bold text-[20px]'>Popular Song</h1>
          <div className="flex w-full  mt-4 bg-black overflow-x-auto scorllbar-hide pb-3 space-x-4">
            {
              data.songitem2.map((value) => {
                let isSongPlaying = songId === value.id && isPlaying
                return (
                  <div className="flex shrink-0" key={value.id}>
                    <PopularSong value={value} isSongPlaying={isSongPlaying} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popular