/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit'
import songPlayerSlice from './slice/songPlayerSlice'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import playListSlice from './slice/playListSlice'
import accountSlice from '../redux/slice/accountSlice'

// let store = configureStore({
//     reducer : {
//         songPlayer : songPlayerSlice,
//         playlist : playListSlice,
//         account : accountSlice
//     }
// })

const songPlayerPersistConfig = {
  key: 'songPlayer', // Key for localStorage
  storage,           // Specify storage type
  whitelist: ['artistObject'], // Persist only 'artistObject'
};

let playListPersistConfig = {
  key: 'playlist',
  storage,
  whitelist: ['playlist']
}

let accountPersistConfig = {
  key: 'account',
  storage,
  whitelist: ['account']
}

// Step 2.2: Combine reducers and wrap songPlayerSlice with persistReducer
const rootReducer = combineReducers({
  songPlayer: persistReducer(songPlayerPersistConfig, songPlayerSlice),
  playlist : persistReducer(playListPersistConfig, playListSlice) ,
  account : persistReducer(accountPersistConfig, accountSlice)
});

// Step 2.3: Create and export the store
const store = configureStore({
  reducer: rootReducer,
});

export default store
