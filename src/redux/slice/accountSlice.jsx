/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    login : false,  
    userObject : null,
    users : []
}

let accountSlice = createSlice({
    name : 'account',
    initialState,
    reducers : {
        setLogin : (state) =>
        {
            state.login = true
        },
        signupHandler : (state, action) =>
        {
            state.userObject = action.payload
            state.login = true
            console.log(state.userObject)
            state.users = [...state.users, state.userObject]
            console.log(state.users)
        }
    }
})

export let {setLogin, signupHandler } = accountSlice.actions
export default accountSlice.reducer
