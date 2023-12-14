import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
import { flushSync } from 'react-dom';
let url = import.meta.env.VITE_APP_FOODS_API

const initialState = {
    loginData:null,
    data: null,
    loading: false,
    error: null,
    message: null,
    singleData: null,
  
    
   
}

const LocalitySlices = createSlice({
    name: "LocalityApi",
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
            .addCase(fetchAllDataLocality.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllDataLocality.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.data = action.payload.localityModelList;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchAllDataLocality.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchLoginDataLocality.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLoginDataLocality.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.loginData = action.payload.localityModelList;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchLoginDataLocality.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchDeleteDataLocality.pending, (state) => {
                state.loading = true;
            })            
            .addCase(fetchDeleteDataLocality.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchDeleteDataLocality.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchSaveUpdateLocality.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSaveUpdateLocality.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message;
                }
                else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchSaveUpdateLocality.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchSingleDataLocality.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSingleDataLocality.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.singleData = action.payload.localityResponseModelList;
                }
                else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchSingleDataLocality.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error"
            })
         
           
    }

});
export const fetchAllDataLocality = createAsyncThunk('api/fetchDataLocality', async () => {
    try {
        const response = await axios.get(`${url}/api/Locality/GetAllLocality`);
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});

export const fetchLoginDataLocality = createAsyncThunk('api/fetchLoginDataLocality', async (id) => {
    try {
        const response = await axios.get(`${url}/api/Locality/GetAllLocality/${id}`);
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});

export const fetchDeleteDataLocality = createAsyncThunk('api.fetchDeleteDataLocality', async (id) => {   
    try {
        const response = await axios.delete(`${url}/api/Locality/DeleteLocality/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return response.data

    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchSaveUpdateLocality = createAsyncThunk('api.fetchUpdateSaveLocality', async (data) => {
    try {
        const response = await axios.post(`${url}/api/Locality/SaveupdateLocality`, data);
        console.log("response saveupdate", response.data);
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchSingleDataLocality = createAsyncThunk("api.fetchSingleDataLocality", async (id) => {
      
    try {
        const response = await axios.get(`${url}/api/Locality/GetSingleLocality/${id}`)
        console.log(response.data);
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});



export default LocalitySlices.reducer;
export const { resetStates } = LocalitySlices.actions;