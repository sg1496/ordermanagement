import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
import { flushSync } from 'react-dom';
import dummy from '../../dummy'; 
let url = import.meta.env.VITE_APP_FOODS_API

const initialState = {
    loginData:null,
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
            .addCase(fetchLoginDataUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLoginDataUsers.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.loginData = action.payload.usermodellist;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchLoginDataUsers.rejected, (state, action) => {
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

export const fetchAllDataUsers = createAsyncThunk('api/fetchAllDataUsersManageUser', async () => {
    try {
        const response = await axios.get(`${url}/users/GetAllUsersDetails`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const fetchLoginDataUsers = createAsyncThunk('api/fetchLoginDataUsersManageUser', async (obj) => {
    try {
        const response = await axios.get(`${url}/users/GetAllUsersDetails/${obj.id}/${obj.pid}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const fetchDelDataUser = createAsyncThunk('api.fetchDeleteDataUserManageUser', async (id) => {
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

export const fetchSaveUpdateDataUser = createAsyncThunk('api.fetchUpdateSaveDataManageUser', async (data) => {
    try {
        data.userTypeID = 3;
        
        const response = await axios.post(`${url}/users/saveUpdateUserDetails`, data);
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchSingleEditDataUser = createAsyncThunk("api.fetchSingleEditDataManageUser", async (id) => {
    
    try {
        const response = await axios.get(`${url}/users/getSingleUserDetails/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export default ManageUserSlices.reducer;
export const { resetStates } = ManageUserSlices.actions;

