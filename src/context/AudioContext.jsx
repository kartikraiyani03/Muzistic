/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useRef } from "react";
import React from 'react'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { playHandler, pauseHandler, prevHandler, nextHandler } from "../redux/slice/songPlayerSlice";
import store from "../redux/store";
import { useState } from "react";

export let AudioContext = createContext()

let AudioProvider = ({children}) => 
{
    let dispatch = useDispatch()
    let { isPlaying, songPath, songId } = useSelector((state) => state.songPlayer)
    let audio = useRef(null)
    let [duration, setDuration] = useState(0)
    let [currTime, setCurrTime] = useState(0)
    
      let playSong = (songPath, id, poster, artist, songName, index) => {
            if (songId === id) {
                if (isPlaying) {
                    dispatch(pauseHandler())
                    audio.current.pause()
                    console.log(isPlaying)
                }
                else {
                    dispatch(playHandler({ songPath, id, poster, artist, songName, index }))
                    audio.current.play()
                    console.log(isPlaying)
                }
            }
            else 
            {
                if (audio.current) {
                    dispatch(pauseHandler())
                    audio.current.pause()
                    console.log(isPlaying)
                }

                dispatch(playHandler({ songPath, id, poster, artist, songName, index }))
                audio.current.src = songPath
                audio.current.play()
                console.log(isPlaying)
            }
        }
    
        let pauseSong = () => {
    
            dispatch(pauseHandler())
            audio.current.pause()
            console.log(isPlaying)
        }
  
    let prevSong = () => 
    {
      dispatch(prevHandler())
      let {id, poster, artist, songName, index} = store.getState().songPlayer.songObject
      console.log(store.getState().songPlayer.songObject)
      let prevPath = `src/assets/songs/${id}.mp3`
      audio.current.src = prevPath
      audio.current.play()
    }
  
    let nextSong = () => 
    {
        dispatch(nextHandler())
        const { id, poster, artist, songName, index } = store.getState().songPlayer.songObject;
        console.log(store.getState().songPlayer.songObject)
        let nextPath = `src/assets/songs/${id}.mp3`
        audio.current.src = nextPath
        audio.current.play()
    
    }
    let formTime = (time) => {
        let minute = Math.floor(time / 60);
        let second = Math.floor(time % 60)
        return `${minute}:${second < 10 ? '0' : ''}${second}`
    }

    let timeUpdateHandler = () => {
        setCurrTime(audio.current.currentTime)
    }

    let durationUpdateHandler = () => {
        setDuration(audio.current.duration)
        console.log("Duration " + duration)
    }

    let seekHandler = (event) => {
        const seekTime = (event.nativeEvent.offsetX / event.target.offsetWidth) * duration;
        audio.current.currentTime = seekTime
        setCurrTime(seekTime)
    }
    let progressBarWidth = currTime / duration * 100

    return (
        <AudioContext.Provider value={{playSong, audio, prevSong, pauseSong, nextSong, formTime, timeUpdateHandler, durationUpdateHandler, seekHandler, progressBarWidth, currTime, duration}}>
            {children}
        </AudioContext.Provider>
    );
}

export default AudioProvider