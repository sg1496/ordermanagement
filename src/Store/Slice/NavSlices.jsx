import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {   
    navTitle: "",
    // -------------------------------
    jobs: [],
    searchedJobs: [],
    isLoading: true
}
const NavSlices = createSlice({
    name: "navheader",
    initialState: initialState,
    reducers: {
        navTitle(state, action) {
            console.log("nav title ", action.payload);
            state.navTitle=action.payload
        }
    },

    
})

export default NavSlices.reducer;

export const { navTitle } = NavSlices.actions;