/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";


let playListSlice = createSlice({
    name : "playlist",
    initialState : {
        allPlayList : [],
        likeList : [],
        playListObject : null,
        currPlayList : []

    },
    reducers : {
        add : (state,action) =>
        {
            let {playListObj, songObject} = action.payload
            console.log(action.payload)
            let playlist = state.allPlayList.find((value) => value.pid === playListObj.pid)

            if(playlist)
            {
                if(!Array.isArray(playlist.playlist))
                {
                    playlist.playlist = []
                }

                let isAlreadyAvail = playlist.playlist.some((song) => song.id === songObject.id)

                if(!isAlreadyAvail) 
                {
                    playlist.playlist.push(songObject)
                    console.log(`${songObject.songName} is added to ${playlist.pname}`)
                }
                
                else
                {
                    console.log(`${songObject.songName} is already in the ${playlist.pname}`)
                }
            }
            else 
            {
                console.log(`Playlist with  ${playlist.pid} not found`)
            }
        },
        remove : (state, action) => 
        {
            let {currPlayList, song} = action.payload
            console.log(action.payload)

            let playlist = state.allPlayList.find((playlistOb) => playlistOb.pid === currPlayList.pid) 

            if(playlist)
            {
                if(Array.isArray(playlist?.playlist))
                {
                    let isPresent = playlist.playlist.some((song) => song.id === song.id)

                    if(isPresent)
                    {
                        playlist.playlist = playlist.playlist.filter((value) => value.id !== song.id)
                        console.log(`${song.songName} is removed from ${currPlayList.pname}`)
                    }
                    else 
                    {
                        console.log(`${song.songName} is Not Found in ${currPlayList.pname}`)
                    }
                }
                else 
                {
                    console.log(`${currPlayList.pname} is not have valid array`)
                }
            }
            else 
            {
                console.log(`${currPlayList.pname} Not Exist`)
            }
        },
        addLike : (state, action) =>
        {
            state.likeList.push(action.payload)
        },
        removeLike : (state, action) =>
        {
            state.likeList = state.likeList.filter((song) => song.id !== action.payload.id)
        },
        addPlayListObjectHandler : (state, action) =>
        {
            const existingPlayList = state.allPlayList.find(song => song.id === action.payload.id);
            state.allPlayList = [...state.allPlayList, action.payload]
            console.log(state.allPlayList)
        },
        removePlayListObjectHandler : (state, action) =>
        {
            state.allPlayList = state.allPlayList.filter((value) => value.pid !== action.payload.pid)
        },
        playListClickHandler : (state, action) =>
        {
            state.playListObject = {
                pid : action.payload.pid,
                pname : action.payload.pname,
                playlist : []
            } 
        },
        playListArrayClickHandler : (state, action) =>
        {
            state.currPlayList = action.payload
        }
    }   
})

export let {add, remove, playList, addLike, removeLike, addPlayListObjectHandler,removePlayListObjectHandler, playListClickHandler, playListArrayClickHandler} = playListSlice.actions
export default playListSlice.reducer