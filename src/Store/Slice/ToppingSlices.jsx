import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
import { flushSync } from 'react-dom';
import dummy from '../../dummy';
let url = import.meta.env.VITE_APP_FOODS_API

const initialState = {
    data: null,
    measurementList: null,
    loading: false,
    error: null,
    message: null,
    singleData: null,
    foodType: null,
    orderTypes: null,
    search: ""

}

const ToppingSlices = createSlice({
    name: "ToppingApi",
    initialState: initialState,
    reducers: {
        resetStates: (state) => {
            state.loading = false;
            state.error = null;
            state.message = null
        },
        seachStates: (state, action) => {
            state.search = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiDataToppings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchApiDataToppings.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.data = action.payload.toppinglst;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchApiDataToppings.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchDelApiDataToppings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDelApiDataToppings.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchDelApiDataToppings.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchSaveUpdateToppings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSaveUpdateToppings.fulfilled, (state, action) => {
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
            .addCase(fetchSaveUpdateToppings.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchEditTopping.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEditTopping.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    console.log("======================================================================================", action.payload)
                    state.loading = false;
                    state.singleData = action.payload;
                }
                else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchEditTopping.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error"
            })
            .addCase(GetAllMeasuremenType.pending, (state) => {
                state.loading = true
            })
            .addCase(GetAllMeasuremenType.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.measurementList = action.payload.measurementCompeleteList;
                }
                else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.message = "some error";
                }
            })
            .addCase(GetAllMeasuremenType.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchFoodTypeTopping.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFoodTypeTopping.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.foodType = action.payload.foodTypeList;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchFoodTypeTopping.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(GetAllOrderType.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetAllOrderType.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.orderTypes = action.payload.orderTypeList;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(GetAllOrderType.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(ToppingCombinationDelete.pending, (state) => {
                state.loading = true;
            })
            .addCase(ToppingCombinationDelete.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(ToppingCombinationDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
    }

});
export const fetchApiDataToppings = createAsyncThunk('api/fetchDataToppings', async (FranchiseId) => {
    try {
        const response = await axios.get(`${url}/topping/GetAllToppings/${FranchiseId}`);
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});

export const fetchFoodTypeTopping = createAsyncThunk('api/fetchFoodTypeToppings', async () => {
    try {
        const response = await axios.get(`${url}/api/FoodType/GetAllFoodType`);
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});

export const fetchDelApiDataToppings = createAsyncThunk('api.fetchDelData', async (id) => {
    console.log(id);
    let data = JSON.stringify({
        "ToppingId": id
    });
    try {
        const response = await axios.delete(`${url}/topping/DeleteToppingDetails`, {
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

export const fetchSaveUpdateToppings = createAsyncThunk('api.fetchUpdateSave', async (data) => {
    try {

        data.loginUserID = 9;
        const response = await axios.post(`${url}/topping/SaveupdateTopping`, data);
        console.log("response saveupdate", response.data);
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchEditTopping = createAsyncThunk("api.fetchedit", async (id) => {
    console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiid", id);
    try {
        const response = await axios.get(`${url}/topping/GetSingleTopping/${id}`)
        console.log(response.data);
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export const GetAllMeasuremenType = createAsyncThunk('api/fetchdropdown', async () => {
    try {
        const response = await axios.get(`${url}/api/Measurement/GetAllMeasuremenType`);
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});

export const GetAllOrderType = createAsyncThunk('api/fetchorderTypes', async () => {
    try {
        const response = await axios.get(`${url}/topping/GetAllOrderType`);
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});

export const ToppingCombinationDelete = createAsyncThunk('api/ToppingCombinationDelete', async (id) => {
    try {
        const response = await axios.get(`${url}/topping/DeleteCombinationTopping/${id}`)
        console.log(response.data);
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});




export default ToppingSlices.reducer;
export const { resetStates, seachStates } = ToppingSlices.actions;

