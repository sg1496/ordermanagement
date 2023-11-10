import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
import { flushSync } from 'react-dom';
let url = import.meta.env.VITE_APP_FOODS_API

const initialState = {
    data: null,
    loading: false,
    error: null,
    message: null,
    singleData: null,
    pageData: null,


}

const LoginSlices = createSlice({
    name: "Login",
    initialState: initialState,
    reducers: {
        resetStates: (state) => {
            state.loading = false;
            state.error = null;
            state.message = null
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSaveUpdateDataRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSaveUpdateDataRole.fulfilled, (state, action) => {
                if (action.payload.status === 200 || action.payload.status === 201) {
                    state.loading = false;
                    state.message = action.payload.message;
                }
                else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchSaveUpdateDataRole.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
    }
});


export const fetchSaveUpdateDataRole = createAsyncThunk('api.fetchUpdateSaveDataRole', async (data) => {
    try {

        data.loginUserID = 9;
        const response = await axios.post(`${url}/api/Role`, data);
        console.log("response saveupdate", response.data);
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});



export default LoginSlices.reducer;
export const { resetStates } = LoginSlices.actions;

