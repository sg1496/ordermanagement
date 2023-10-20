import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
import { flushSync } from 'react-dom';
import dummy from '../../dummy'; 
let url = import.meta.env.VITE_APP_FOODS_API

const initialState = {
    data: null,
    loading: false,
    error: null,
    message: null,
    singleData: null,
    
   
}

const ManageUserSlices = createSlice({
    name: "ManageUser",
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
            .addCase(fetchAllDataUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllDataUsers.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.data = action.payload.usermodellist;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchAllDataUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchDelDataUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDelDataUser.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchDelDataUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchSaveUpdateDataUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSaveUpdateDataUser.fulfilled, (state, action) => {
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
            .addCase(fetchSaveUpdateDataUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchSingleEditDataUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSingleEditDataUser.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.singleData = action.payload.usermodellist;
                }
                else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchSingleEditDataUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error"
            })
          
    }

});
export const fetchAllDataUsers = createAsyncThunk('api/fetchAllDataUsers', async () => {
    try {
        const response = await axios.get(`${url}/users/GetAllUsersDetails`);
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});

export const fetchDelDataUser = createAsyncThunk('api.fetchDeleteDataUser', async (id) => {
    console.log(id);
    let data = JSON.stringify({
        "userId": id
    });
    try {
        const response = await axios.delete(`${url}/users/deleteUserDetails`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        })
        return response.data

    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchSaveUpdateDataUser = createAsyncThunk('api.fetchUpdateSaveDataUser', async (data) => {
    try {
        data.userTypeID = 1;
        data.loginUserID = 9;
        const response = await axios.post(`${url}/users/saveUpdateUserDetails`, data);
        console.log("response saveupdate", response.data);
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchSingleEditDataUser = createAsyncThunk("api.fetchSingleEditDataUser", async (id) => {
    
    try {
        const response = await axios.get(`${url}/users/getSingleUserDetails/${id}`)
        console.log(response.data);
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export default ManageUserSlices.reducer;
export const { resetStates } = ManageUserSlices.actions;

