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

export const getSelectPenempatan: any = createAsyncThunk("penempatan/getSelectPenempatan", async(_, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+'/penempatan/select',{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });
        
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const penempatanSlice = createSlice({
    name: "penempatan",
    initialState,
    reducers:{
        resetPenempatan: (state) => initialState
    },
    extraReducers:(builder) => {
        //login
        builder.addCase(getSelectPenempatan.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getSelectPenempatan.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getSelectPenempatan.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {resetPenempatan} = penempatanSlice.actions;
export default penempatanSlice.reducer;