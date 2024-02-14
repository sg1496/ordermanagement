import { faL } from "@fortawesome/free-solid-svg-icons";
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
            state.loading = null;
            state.error = null;
            state.message = null;
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
                    state.data = action.payload.message
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

export default ComboSlices.reducer;
export const { resetStates } = ComboSlices.reducer

