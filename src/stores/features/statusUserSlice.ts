import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

interface variabel {
    data: any;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

const initialState : variabel = {
    data: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getStatusUserSelect: any = createAsyncThunk("note/getStatusUserSelect", async(_, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/status_user/select`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const getStatusUserTable: any = createAsyncThunk("note/getStatusUserTable", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/status_user/data?${datas}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const getStatusUserById: any = createAsyncThunk("note/getStatusUserById", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/status_user/data/${datas.uuid}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const createStatusUser: any = createAsyncThunk("note/createStatusUser", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.post(import.meta.env.VITE_REACT_APP_API_URL+`/status_user/data`,{
            name:datas.name,
            sequence:datas.sequence, 
            is_select:datas.is_select, 
            is_active:datas.is_active,
            is_delete:datas.is_delete
        },{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const updateStatusUser: any = createAsyncThunk("note/updateStatusUser", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.patch(import.meta.env.VITE_REACT_APP_API_URL+`/status_user/data/${datas.uuid}`,{
            name:datas.name,
            sequence:datas.sequence, 
            is_select:datas.is_select, 
            is_active:datas.is_active,
            is_delete:datas.is_delete
        },{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const statusUserSlice = createSlice({
    name: "statusUser",
    initialState,
    reducers:{
        resetStatusUser: (state) => initialState
    },
    extraReducers:(builder) => {
        //table
        builder.addCase(getStatusUserSelect.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getStatusUserSelect.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getStatusUserSelect.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //by id
        builder.addCase(getStatusUserById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getStatusUserById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getStatusUserById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        builder.addCase(getStatusUserTable.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getStatusUserTable.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getStatusUserTable.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        builder.addCase(createStatusUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createStatusUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(createStatusUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        builder.addCase(updateStatusUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateStatusUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(updateStatusUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {resetStatusUser} = statusUserSlice.actions;
export default statusUserSlice.reducer;