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

export const devisiSlice = createSlice({
    name: "devisi",
    initialState,
    reducers:{
        resetDevisi: (state) => initialState
    },
    extraReducers:(builder) => {
        //login
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
    }
})

export const {resetDevisi} = devisiSlice.actions;
export default devisiSlice.reducer;