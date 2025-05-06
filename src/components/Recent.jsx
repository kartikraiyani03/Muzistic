/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import data from '../data/lastListen.json'
import { useSelector } from 'react-redux';
import Song from './RecentSong';
import { AudioContext } from '../context/AudioContext';


const Recent = () => {

    let {songId, isPlaying, songPath, songObject} = useSelector((state) => state.songPlayer)

  return (
    <div>
      <div className="mt-7">
        <div className="text-gray px-2 font-bold">
          Last Listen
        </div>

        <div className="w-full text-white justify-between items-center mt-3">
          {
            data.songitem.map((value) => {
              let isSongPlaying = songId === value.id && isPlaying
              return (
                <div className="" key={value.id}>
                  <Song value={value} isSongPlaying={isSongPlaying} />
                </div>
              )
            })
          }
        </div>
        <audio/>
      </div>
    </div>
  )
}

export default Recent



