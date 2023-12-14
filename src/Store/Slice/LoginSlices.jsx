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
            .addCase(fetchLoginPage.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLoginPage.fulfilled, (state, action) => {
                console.log("response saveupdate dd", action.payload);
                localStorage.setItem('token', action.payload.token)
                if (action.payload.token) {
                    state.loading = false;
                    state.message = action.payload.message;
                    state.data = action.payload;
                }
                else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchLoginPage.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
    }
});


export const fetchLoginPage = createAsyncThunk('api.fetchLoginPage', async (data) => {
    try {


        const response = await axios.post(`${url}/api/Login`, data);

        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});



export default LoginSlices.reducer;
export const { resetStates } = LoginSlices.actions;

