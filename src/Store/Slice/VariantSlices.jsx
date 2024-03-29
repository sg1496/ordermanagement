import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
let url = import.meta.env.VITE_APP_FOODS_API

async function deleteVarient1(id) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`${url}/variant/DeleteVariantDetails`, {
            method: "DELETE",
            body: JSON.stringify({ "VariantId": id }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response) {
            reject("err")
        }
        const datas = await response.json();
        resolve(datas)
    });  
}



const initialState = {
    data: null,
    loading: false,
    error: null,
    message: null,
    singleData: null,
}

const VariantSlices = createSlice({
    name: 'api',
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
            .addCase(fetchApiData.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchApiData.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.data = action.payload.variantlst;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchApiData.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchSingleApiData.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchSingleApiData.fulfilled, (state, action) => {
                console.log("single", action);
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.singleData = action.payload.singleVariant;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchSingleApiData.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(deleteSingleApiData.fulfilled, (state, action) => {
                console.log("delete", action);
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(saveUpdateVariant.fulfilled, (state, action) => {
                
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
    },
});

export const saveUpdateVariant = createAsyncThunk('api/saveUpdateData', async (data) => {
    try {
        const response = await axios.post(`${url}/variant/saveUpdateVariant`, data)
        console.log("savs response ", response.data);
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});
export const fetchApiData = createAsyncThunk('api/fetchData', async (FranchiseId) => {
    try {
        const response = await axios.get(`${url}/variant/GetAllVariants/${FranchiseId}`);

        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});

export const fetchSingleApiData = createAsyncThunk('api/fetchSingleData', async (id) => {
    try {
        const response = await axios.get(`${url}/variant/GetSingleVariant/${id}`)

        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});
export const deleteSingleApiData = createAsyncThunk('api/deleteSingleData', async (id) => {
    try {
        const result = await deleteVarient1(id)
        console.log("delete api id: ", id, result);
        return result;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});
export default VariantSlices.reducer;
export const { resetStates } = VariantSlices.actions;
