/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react'
import Recent from '../components/Recent'
import Popular from '../components/Popular'
import Artist from '../components/Artist'
import { AudioContext } from '../context/AudioContext'

const Home = () => {    

    let [playlist, setPlayList] = useState([]) 
    const [open, setOpen] = useState(true)
    let {audio} = useContext(AudioContext)

  return (
    <div className='pt-[90px] md:mt-4 text-white bg-black'>
      <div className="px-2">
        <div className="z-10 ">
          
          <h1 className='font-bold text-[20px]'>Marshmello - Alone</h1>
          <h4 className='text-gray text-sm mr-2 my-1 mb-2 font-semibold'>&quot;Alone&quot; is a single by American DJ and record producer Marshmello.then later released as a digital download on June 17, 2016 on
            <span className='text-red'> Muzistic.</span>
          </h4>
          <div className="flex gap-2 justify-start mt-3 items-center">
            <button className=" text-white border-2  border-red bg-red font-semibold text-sm rounded-3xl py-1 px-5 hover:text-red hover:border-red hover:bg-black">Play</button>
            <button className="text-red border-2 border-red bg-black rounded-3xl text-sm py-1 font-semibold px-3 hover:text-white hover:bg-red hover:border-red">Follow</button>
          </div>
        </div>
      </div>
      <div className="sm:flex gap-4 mt-4">
          <Recent audio={audio}  />
          <Popular audio={audio} />
          <Artist />
      </div>
      <audio ref={audio} />
    </div>
  )
}

export default Home