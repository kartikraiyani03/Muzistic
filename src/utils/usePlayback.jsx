/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { playHandler, pauseHandler, prevHandler, nextHandler } from "../redux/slice/songPlayerSlice";
import store from "../redux/store";

const usePlayback = (audio) => {
    let dispatch = useDispatch()
    let { isPlaying, songPath, songId } = useSelector((state) => state.songPlayer)
    
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
    return { playSong, pauseSong, prevSong, nextSong };
};

export default usePlayback;
