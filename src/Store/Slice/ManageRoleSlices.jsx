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
    pageData: null,
    
   
}

const ManageRoleSlices = createSlice({
    name: "ManageRole",
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
            .addCase(fetchAllDataRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllDataRole.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.data = action.payload.roleResponseList;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchAllDataRole.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchDelDataRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDelDataRole.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.message = action.payload.message;
                } else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchDelDataRole.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchSaveUpdateDataRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSaveUpdateDataRole.fulfilled, (state, action) => {
                if (action.payload.status === 200 || action.payload.status === 201) {
                    state.loading = false;
                    state.message = action.payload.message;
                }
                else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchSaveUpdateDataRole.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error";
            })
            .addCase(fetchSingleEditDataRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSingleEditDataRole.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.singleData = action.payload;
                }
                else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchSingleEditDataRole.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error"
            })
            .addCase(fetchAllDataRolepage.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllDataRolepage.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loading = false;
                    state.pageData = action.payload.pageTypeResponseList;
                }
                else {
                    state.loading = false;
                    state.error = !action.payload.status;
                    state.msg = "some error"
                }
            })
            .addCase(fetchAllDataRolepage.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.msg = "some error"
            })
          
    }

});
export const fetchAllDataRole = createAsyncThunk('api/fetchAllDatarole', async () => {
    try {
        const response = await axios.get(`${url}/api/Role/GetAllRole`);
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});
export const fetchAllDataRolepage = createAsyncThunk('api/fetchAllDatarolepage', async () => {
    try {
        const response = await axios.get(`${url}/api/Role/GetAllPAgeType`);
        return response.data;
    } catch (error) {
        console.log("error ", error);
        throw new Error(error.message);
    }
});

export const fetchDelDataRole = createAsyncThunk('api.fetchDelDataRole', async (id) => {
    console.log("dafsafasfasd",id);
   
    try {
        const response = await axios.delete(`${url}/api/Role/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log("response", response.data)
        return response.data

    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchSaveUpdateDataRole = createAsyncThunk('api.fetchUpdateSaveDataRole', async (data) => {
    try {
        
        data.loginUserID = 9;
        const response = await axios.post(`${url}/api/Role`, data);
        console.log("response saveupdate", response.data);
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export const fetchSingleEditDataRole = createAsyncThunk("api.fetchSingleEditDataUser", async (id) => {
    
    try {
        const response = await axios.get(`${url}/api/Role/GetSingleRole/${id}`)
        console.log(response.data);
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
});

export default ManageRoleSlices.reducer;
export const { resetStates } = ManageRoleSlices.actions;

