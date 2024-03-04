import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = import.meta.env.VITE_APP_FOODS_API;

const initialState = {
    days: null,
    loading: false,
    error: null,
    message: null,
    singleData: null,
    parentCategories: null,
    searchcategory: [],
}

const CommonSlices = createSlice({
    name: "common",
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
            .addCase(GetAllDays.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetAllDays.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.days = action.payload.daysList
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "some error"
                }
            })
            .addCase(GetAllDays.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
    }
})

export const GetAllDays = createAsyncThunk('getAllDays', async () => {
    try {
        const response = await axios.get(`${url}/api/CommonApi/GetAllDays`)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
})

export default CommonSlices.reducer;
export const { resetStates } = CommonSlices.actions