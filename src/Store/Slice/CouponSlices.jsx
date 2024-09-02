import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let url = import.meta.env.VITE_APP_FOODS_API

const initialState = {
    data: null,
    loading: false,
    error: null,
    message: null,
    singleData: null,
    discountType: null,
    limitation: null,
    searchcategory: [],
    search: ""
}

const CouponSlices = createSlice({
    name: "couponSlices",
    initialState: initialState,
    reducers: {
        resetStates: (state) => {
            state.loading = false;
            state.error = null;
            state.message = null;
        },

        searchState: (state, action) => {
            state.search = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoginAllDataCoupon.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLoginAllDataCoupon.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.data = action.payload.couponlst;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error";
                }
            })
            .addCase(fetchLoginAllDataCoupon.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.msg = "some Error";
            })
            .addCase(fetchALLDiscountTypeCoupon.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchALLDiscountTypeCoupon.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.discountType = action.payload.discountTypeList;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error";
                }
            })
            .addCase(fetchALLDiscountTypeCoupon.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.msg = "some Error";
            })
            .addCase(fetchLimitationCoupon.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLimitationCoupon.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.limitation = action.payload.discountLimitationList;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error";
                }
            })
            .addCase(fetchLimitationCoupon.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.msg = "some Error";
            })
            .addCase(fetchSaveUpdateCoupon.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSaveUpdateCoupon.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "some Error"
                }
            })
            .addCase(fetchSaveUpdateCoupon.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.message = "someError"
            })
            .addCase(fetchSingleDataCoupon.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchSingleDataCoupon.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.singleData = action.payload
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "someError";
                }
            })
            .addCase(fetchSingleDataCoupon.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.message = "someError"
            })
            .addCase(fetchDeleteDataCoupon.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDeleteDataCoupon.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "someError";
                }
            })
            .addCase(fetchDeleteDataCoupon.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.message = "someError"
            })
    }
});

export const fetchLoginAllDataCoupon = createAsyncThunk('apiAllDataCoupon', async (FranchiseId) => {
    try {
        const response = await axios.get(`${url}/Coupon/GetAllCoupons/${FranchiseId}`)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchALLDiscountTypeCoupon = createAsyncThunk('apiAllDiscountCoupon', async () => {
    try {
        const response = await axios.get(`${url}/api/CommonApi/GetAllDiscount`)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchLimitationCoupon = createAsyncThunk('apiAllLimimtationDataCoupon', async () => {
    try {
        const response = await axios.get(`${url}/api/CommonApi/GetAllDiscountLimitation`)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchSaveUpdateCoupon = createAsyncThunk("fetchSaveUpdateCoupon", async (saveUpdateData) => {
    try {
        const response = await axios.post(`${url}/Coupon/SaveupdateCoupon`, saveUpdateData)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchSingleDataCoupon = createAsyncThunk("fetchSingleDataCoupon", async (CouponId) => {
    try {
        const response = await axios.get(`${url}/Coupon/GetSingleCoupon/${CouponId}`)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchDeleteDataCoupon = createAsyncThunk("fetchDeletedIDCoupon", async (id) => {
    let data = JSON.stringify({
        "couponID": id
    });
    try {
        const response = await axios.delete(`${url}/Coupon/DeleteCouponDetails`, {
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

export default CouponSlices.reducer;
export const { resetStates, searchState } = CouponSlices.actions;