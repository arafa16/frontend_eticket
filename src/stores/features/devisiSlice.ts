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

export const getSelectDevisi: any = createAsyncThunk("devisi/getSelectDevisi", async(_, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+'/devisi/select',{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });
        
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const getDevisiTable: any = createAsyncThunk("devisi/getDevisiTable", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/devisi/data?${datas}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });
        
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const getDevisiById: any = createAsyncThunk("devisi/getDevisiById", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/devisi/data/${datas.uuid}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });
        
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const createDevisi: any = createAsyncThunk("devisi/createDevisi", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.post(import.meta.env.VITE_REACT_APP_API_URL+`/devisi/data`,{
            name:datas.name,
            sequence:datas.sequence, 
            is_select:datas.is_select, 
            is_active:datas.is_active
        },{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        console.log(datas, response, 'response')
        
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const updateDevisi: any = createAsyncThunk("devisi/updateDevisi", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.patch(import.meta.env.VITE_REACT_APP_API_URL+`/devisi/data/${datas.uuid}`,{
            name:datas.name,
            sequence:datas.sequence, 
            is_select:datas.is_select, 
            is_active:datas.is_active
        },{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        console.log(datas, response, 'response')
        
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const devisiSlice = createSlice({
    name: "devisi",
    initialState,
    reducers:{
        resetDevisi: (state) => initialState
    },
    extraReducers:(builder) => {
        //devisi select
        builder.addCase(getSelectDevisi.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getSelectDevisi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getSelectDevisi.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //devisi table
        builder.addCase(getDevisiTable.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getDevisiTable.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getDevisiTable.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //devisi table
        builder.addCase(getDevisiById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getDevisiById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getDevisiById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //create devisi
        builder.addCase(createDevisi.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createDevisi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(createDevisi.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //create devisi
        builder.addCase(updateDevisi.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateDevisi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(updateDevisi.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {resetDevisi} = devisiSlice.actions;
export default devisiSlice.reducer;