import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = import.meta.env.VITE_APP_FOODS_API;

const initialState = {
    data: null,
    loading: false,
    error: null,
    message: null,
    singleData: null,
    parentCategories: null,
    searchcategory: [],
}

const ComboSlices = createSlice({
    name: "combo",
    initialState: initialState,
    reducers: {
        resetStates: (state) => {
            state.loading = false;
            state.error = null;
            state.message = null
        }  
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllDataByIDCombo.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetAllDataByIDCombo.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.data = action.payload.comboProductlst
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "some error";
                }
            })
            .addCase(GetAllDataByIDCombo.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })

            .addCase(SaveUpdataCombo.pending, (state) => {
                state.loading = true;
            })
            .addCase(SaveUpdataCombo.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "some error";
                }
            })
            .addCase(SaveUpdataCombo.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })

            .addCase(DeleteCombo.pending, (state) => {
                state.loading = true;
            })
            .addCase(DeleteCombo.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "some error";
                }
            })
            .addCase(DeleteCombo.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })

            .addCase(ComboGetById.pending, (state) => {
                state.loading = true;
            })
            .addCase(ComboGetById.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.singleData = action.payload
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "some error";
                }
            })
            .addCase(ComboGetById.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
    }
})

export const GetAllDataByIDCombo = createAsyncThunk('api/fetchDataCombo', async (FranchiseId) => {
    try {
        const response = await axios.get(`${url}/ComboProduct/GetAllComboProducts/${FranchiseId}`);
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
})

export const SaveUpdataCombo = createAsyncThunk('saveUpdateCombo', async(data)=>{
    try {
        const response = await axios.post(`${url}/ComboProduct/SaveupdateComboProduct`, data)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
})

export const DeleteCombo = createAsyncThunk('DeleteCombo', async(id)=>{
    console.log("check id",id)
    let data = JSON.stringify({
        "comboProductID": id.id,
        "franchiseId": id.fid,
      });
    try {
        const response = await axios.delete(`${url}/ComboProduct/DeleteComboProduct`, {
            headers:{
                "Content-Type": 'application/json',
            }, 
            data: data
            })
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
})

export const ComboGetById = createAsyncThunk('combogetbyid', async(ComboProductId) =>{
    try {
        const response = await axios.get(`${url}/ComboProduct/GetSingleComboProduct/${ComboProductId}`)  
        return response.data      
    } catch (error) {
        throw new Error(error.message)
    }
})

export default ComboSlices.reducer;
export const { resetStates } = ComboSlices.actions

