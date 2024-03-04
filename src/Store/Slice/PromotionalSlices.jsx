import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { json } from "react-router-dom";
let url = import.meta.env.VITE_APP_FOODS_API;

const initialState = {
    data: null,
    promotionalType: null,
    variantList: null,
    productList: null,
    loading: false,
    error: null,
    message: null,
    singleData: null,
    parentCategories: null,
    searchcategory: [],
}

const PromotionalSlices = createSlice({
    name: "promotionalSlice",
    initialState: initialState,
    reducers: {
        resetStates: (state) => {
            state.loading = false;
            state.error = null;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(Promotionaltype.pending, (state) => {
                state.loading = true;
            })
            .addCase(Promotionaltype.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.promotionalType = action.payload.promotionalTypeslst;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "some error"
                }
            })
            .addCase(Promotionaltype.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.message = "some error"
            })

            .addCase(GetAllPromotionalActivities.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetAllPromotionalActivities.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.data = action.payload.promotionalActivitylst;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "some error"
                }
            })
            .addCase(GetAllPromotionalActivities.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.message = "some error"
            })

            .addCase(GetPromotionalActivityVariants.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetPromotionalActivityVariants.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.variantList = action.payload.promotionalActivityVariantslst;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "some error"
                }
            })
            .addCase(GetPromotionalActivityVariants.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.message = "some error"
            })

            .addCase(GetPromotionalActivityProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetPromotionalActivityProducts.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.productList = action.payload.promotionalActivityProductslst;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "some error"
                }
            })
            .addCase(GetPromotionalActivityProducts.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.message = "some error"
            })

            .addCase(SaveupdatePromotionalActivity.pending, (state) => {
                state.loading = true;
            })
            .addCase(SaveupdatePromotionalActivity.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "some error"
                }
            })
            .addCase(SaveupdatePromotionalActivity.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.message = "some error"
            })

            .addCase(GetSinglePromotionalActivity.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetSinglePromotionalActivity.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.singleData = action.payload;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "some error"
                }
            })
            .addCase(GetSinglePromotionalActivity.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.message = "some error"
            })

            .addCase(DeletePromotionalActivity.pending, (state) => {
                state.loading = true;
            })
            .addCase(DeletePromotionalActivity.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "some error"
                }
            })
            .addCase(DeletePromotionalActivity.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.message = "some error"
            })


    }
})

export const Promotionaltype = createAsyncThunk('promotinalvariant', async (id) => {
    try {
        const response = await axios.get(`${url}/PromotionalActivities/GetAllPromotionalTypes`)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
})

export const GetAllPromotionalActivities = createAsyncThunk('GetAllPromotionalActivities', async (FranchiseId) => {
    try {
        const response = await axios.get(`${url}/PromotionalActivities/GetAllPromotionalActivities/${FranchiseId}`)
        
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
})


export const GetPromotionalActivityVariants = createAsyncThunk('GetPromotionalActivityVariants', async (data) => {
    try {
        const response = await axios.put(`${url}/PromotionalActivities/GetPromotionalActivityVariants`, data)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
})

export const GetPromotionalActivityProducts = createAsyncThunk('GetPromotionalActivityProducts', async (data) => {
    try {
        const response = await axios.put(`${url}/PromotionalActivities/GetPromotionalActivityProducts`, data)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
})

export const SaveupdatePromotionalActivity = createAsyncThunk('SaveupdatePromotionalActivity', async (data) => {
    console.log("check state", data)

    try {
        const response = await axios.post(`${url}/PromotionalActivities/SaveupdatePromotionalActivity/`, data)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
})

export const GetSinglePromotionalActivity = createAsyncThunk('GetSinglePromotionalActivity', async (PromotionalActivityId) => {
    try {
        const response = await axios.get(`${url}/PromotionalActivities/GetSinglePromotionalActivity/${PromotionalActivityId}`)        
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
})

export const DeletePromotionalActivity = createAsyncThunk('DeletePromotionalActivity', async (id) => {
    
    let data = JSON.stringify({
       "promotionalActivityId": id.promotionalActivityId,
        "loginUserId": parseInt(id.loginUserId)
    })
    console.log("check data Deg", data)

    try {
        const response = await axios.delete(`${url}/PromotionalActivities/DeletePromotionalActivity`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        })
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
})

export default PromotionalSlices.reducer;
export const { resetStates } = PromotionalSlices.actions;