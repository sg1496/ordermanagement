import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
let url = import.meta.env.VITE_APP_FOODS_API

const initialState = {
    data: null,
    loading: false,
    error: null,
    message: null,
    singleData: null,
    parentCategories: null,
    searchcategory: [],
}

const CategorySlices = createSlice({
    name: "CategoryApi",
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
            .addCase(fetchApiDataCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchApiDataCategory.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.data = action.payload.categorylst;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchApiDataCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchDelApiDataCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDelApiDataCategory.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchDelApiDataCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchSaveUpdateCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSaveUpdateCategory.fulfilled, (state, action) => {
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
            .addCase(fetchSaveUpdateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchEditCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEditCategory.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.singleData = action.payload.singleCategory;
                }
                else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchEditCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error"
            })
            .addCase(fetchParentCategory.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchParentCategory.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.parentCategories = action.payload.parentCategories;
                }
                else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "some error";
                }
            })
            .addCase(fetchParentCategory.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
    }

});
export const fetchApiDataCategory = createAsyncThunk('api/fetchDataCategory', async (FranchiseId) => {
    try {
        const response = await axios.get(`${url}/category/GetAllCategories/${FranchiseId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const fetchDelApiDataCategory = createAsyncThunk('api.fetchDelDataCategory', async (id) => {
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

export const fetchSaveUpdateCategory = createAsyncThunk('api.fetchUpdateSaveCategory', async (data) => {
    try {
        const response = await axios.post(`${url}/category/SaveupdateCategory`, data);
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchEditCategory = createAsyncThunk("api.fetcheditCategory", async (id) => {
    try {
        const response = await axios.get(`${url}/category/GetSingleCategory/${id}`)
        return response.data

    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchParentCategory = createAsyncThunk('fetchParentCategory', async (FranchiseId) => {
    try {
        const response = await axios.get(`${url}/api/ParentCategory/GetAllparentCategory/${FranchiseId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});



export default CategorySlices.reducer;
export const { resetStates} = CategorySlices.actions;