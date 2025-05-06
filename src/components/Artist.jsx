/* eslint-disable no-unused-vars */
import React from 'react'
// import data from '../data/lastListen.json'
import { useNavigate } from 'react-router-dom'
import data from '../data/artistData.json'
import { useDispatch } from 'react-redux'
import { artistClickHandler } from '../redux/slice/songPlayerSlice'

const Artist = () => {

  let dis = useDispatch()
  let nav = useNavigate()

  let clickHandler = (artist) => {
    nav(`/artist/${artist.id}`)
    dis(artistClickHandler(artist))
  }

  return (
    <div className='m-1 py-4 pb-[130px] mx-3'>
      <div className="">
        <h1 className='text-[20px] text-white font-bold '>Popular Artist</h1>
      </div>
      <div className="mt-4 shrink-0 flex overflow-x-auto scrollbar-hidden pb-2 gap-x-4">
        {
          data.artists.map((value) => {
            return (
              <div key={value.id} className="shrink-0" onClick={() => clickHandler(value)}>
                <div className="flex-cols shrink-0">
                  <img src={value.poster} className='h-[100px] w-[100px] rounded-full object-cover' alt="" />
                  <h1 className='mt-3 text-center font-semibold text-white text-[12px]'>{value.artistName}</h1>
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default Artist