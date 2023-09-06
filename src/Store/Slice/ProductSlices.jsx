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
    searchcategory: []
}

const ProductSlices = createSlice({
    name: "ToppingApi",
    initialState: initialState,
    reducers: {
        resetStates: (state) => {
            state.loading = false;
            state.error = null;
            state.message = null
        },
        searchstates(state, action) {
            state.searchcategory = []
            const data = state.searchcategory.push(action.payload)
            console.log("data", data);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiDataProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchApiDataProduct.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.data = action.payload.productlst;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchApiDataProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchDelApiDataProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDelApiDataProduct.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchDelApiDataProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchSaveUpdateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSaveUpdateProduct.fulfilled, (state, action) => {
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
            .addCase(fetchSaveUpdateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchEditProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEditProduct.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.singleData = action.payload.singleProductList;
                    
                }
                else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchEditProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error"
            })
            .addCase(fetchDropDownProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchDropDownProduct.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.data = action.payload.categorylst;
                }
                else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "some error";
                }
            })
            .addCase(fetchDropDownProduct.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
    }

});
export const fetchApiDataProduct = createAsyncThunk('api/fetchApiDataProduct', async () => {
    try {
        const response = await axios.get(`${url}/product/GetAllProducts`);
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});

export const fetchDelApiDataProduct = createAsyncThunk('api.fetchDelData', async (id) => {
    let data = JSON.stringify({
        "categoryId": id
    });
    try {
        const response = await axios.delete(`${url}/category/DeleteCategoryDetails`, {
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

export const fetchSaveUpdateProduct = createAsyncThunk('api.fetchUpdateSave', async (data) => {
    console.log("daata",data);
    try {
        const response = await axios.post(`${url}/product/SaveupdateProduct`, data);
        console.log("response saveupdate", response.data);
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchEditProduct = createAsyncThunk("api.fetchedit", async (id) => {
    console.log(id);
    try {
        // const response = await axios.get(`${url}/category/GetSingleCategory/${id}`)
        return response.data

    } catch (error) {
        throw new Error(error.message)
    }
});
export const fetchDropDownProduct = createAsyncThunk('api/fetchdropdown', async () => {
    try {
        const response = await axios.get(`${url}/category/GetAllCategories`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});
      


export default ProductSlices.reducer;
export const { resetStates, searchstates } = ProductSlices.actions;