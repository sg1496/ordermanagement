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
    statelistdata:null
    
   
}

const SupplierSlices = createSlice({
    name: "SupplierApi",
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
            .addCase(fetchAllDataSupplier.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllDataSupplier.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.data = action.payload.suppilerModelList;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchAllDataSupplier.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchDeleteDataSupplier.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDeleteDataSupplier.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchDeleteDataSupplier.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchSaveUpdateSupplier.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSaveUpdateSupplier.fulfilled, (state, action) => {
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
            .addCase(fetchSaveUpdateSupplier.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchSingleDataSupplier.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSingleDataSupplier.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.singleData = action.payload.suppilerResponseModelList;
                }
                else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchSingleDataSupplier.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error"
            })
            .addCase(fetchAllDataState.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllDataState.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.statelistdata = action.payload.stateList;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchAllDataState.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
           
    }

});
export const fetchAllDataSupplier = createAsyncThunk('api/fetchDataSupplier', async () => {
    try {
        const response = await axios.get(`${url}/api/Supplier/GetAllSuppiler`);
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});

export const fetchDeleteDataSupplier = createAsyncThunk('api.fetchDeleteDataSupplier', async (id) => {
    console.log("dafsafasfasd",id);
   
    try {
        const response = await axios.delete(`${url}/api/Supplier/DeleteSuppiler/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log("response", response.data)
        return response.data

    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchSaveUpdateSupplier = createAsyncThunk('api.fetchUpdateSaveSupplier', async (data) => {
    try {
        
        data.loginUserID = 9;
        const response = await axios.post(`${url}/api/Supplier/SaveupdateSuppiler`, data);
        console.log("response saveupdate", response.data);
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchSingleDataSupplier = createAsyncThunk("api.fetchSingleDataSupplier", async (id) => {
      
    try {
        const response = await axios.get(`${url}/api/Supplier/GetSingleSuppiler/${id}`)
        console.log(response.data);
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchAllDataState = createAsyncThunk('api/fetchDataState', async () => {
    try {
        const response = await axios.get(`${url}/api/CommonOMController/GetAllState`);
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});


export default SupplierSlices.reducer;
export const { resetStates } = SupplierSlices.actions;