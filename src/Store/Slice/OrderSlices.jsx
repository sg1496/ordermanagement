import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
let url = import.meta.env.VITE_APP_FOODS_API

const initialState = {
    data: null,  //  variant
    loading: false,
    error: null,
    message: null,
    singleData: null,
    productCategory: null,
}

const OrderSlices = createSlice({
    name: 'order',
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
            .addCase(OrderGetProductCategory.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(OrderGetProductCategory.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.productCategory = action.payload.productCategoryModelList;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(OrderGetProductCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            
    },
});

export const OrderGetProductCategory = createAsyncThunk('Order/GetProductCategory', async (CategoryId) => {
    console.log("check366", CategoryId)
    try {
        const response = await axios.get(`${url}/Order/GetProductCategory/${CategoryId}`);
        console.log("check", response.data)
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});



export default OrderSlices.reducer;
export const { resetStates } = OrderSlices.actions;
