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

export const getStatusTicket: any = createAsyncThunk("statusTicket/GetStatusTicket", async(_, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/status_ticket/data`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const statusTicketSlice = createSlice({
    name: "statusTicket",
    initialState,
    reducers:{
        resetStatusTicket: (state) => initialState
    },
    extraReducers:(builder) => {
        //getStatusTicket
        builder.addCase(getStatusTicket.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getStatusTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getStatusTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {resetStatusTicket} = statusTicketSlice.actions;
export default statusTicketSlice.reducer;