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

export const getStatusTicketByCode: any = createAsyncThunk("statusTicket/getStatusTicketByCode", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/status_ticket/data/code/${datas.code}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const statusTicket2Slice = createSlice({
    name: "statusTicket2",
    initialState,
    reducers:{
        resetStatusTicket2: (state) => initialState
    },
    extraReducers:(builder) => {

        //getStatusTicketByCode
        builder.addCase(getStatusTicketByCode.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getStatusTicketByCode.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getStatusTicketByCode.rejected, (state, action) => { 
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {resetStatusTicket2} = statusTicket2Slice.actions;
export default statusTicket2Slice.reducer;