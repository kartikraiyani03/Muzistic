/* eslint-disable no-unused-vars */
import { createSlice, current, isPlain } from "@reduxjs/toolkit";
import data from '../../data/lastListen.json'

let initialState = {
    isPlaying : false,
    songId : null,
    songPath : null, 
    songObject :  null,
    artistObject : null,
    currIndex : 0,
    songs : data.songitem,
    popularSongs : data.songitem2
    // audio : new Audio() // This will not work in the server side rendering
}

let songPlayerSlice = createSlice({
    name : 'songPlayer',
    initialState,
    reducers : {

        playHandler : (state, action) =>
        {
            state.isPlaying = true
            state.songObject = action.payload
            state.songId = action.payload.id
            state.songPath = action.payload.songPath
            console.log(state.songObject)
        },
        pauseHandler : (state) =>
        {
            state.isPlaying = false;
            console.log(state.songObject)
        },
        prevHandler : (state, action) =>
        {
            let prevIndex = (state.currIndex - 1 + state.songs.length) % state.songs.length;
            state.currIndex = prevIndex
            state.songObject = state.songs[prevIndex]
            state.isPlaying = true
        },
        nextHandler : (state) =>
        {
            let nextIndex = (state.currIndex + 1) % state.songs.length;
            state.currIndex = nextIndex
            state.songObject = state.songs[nextIndex]
            state.isPlaying = true
        },
        artistClickHandler : (state, actions) =>
        {
            state.artistObject = actions.payload
        }
    }
})
export let {playHandler, pauseHandler, isPlaying, nextHandler, prevHandler, artistClickHandler} = songPlayerSlice.actions
export default songPlayerSlice.reducer