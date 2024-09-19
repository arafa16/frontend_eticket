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

export const deleteTicket: any = createAsyncThunk("ticket/deleteTicket", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.delete(import.meta.env.VITE_REACT_APP_API_URL+`/ticket/${datas.uuid}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const GetCountTicket: any = createAsyncThunk("ticket/GetCountTicket", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/ticket/count?${datas}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        console.log(datas, 'responser')

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});


export const ticket2Slice = createSlice({
    name: "ticket2",
    initialState,
    reducers:{
        resetTicket2: (state) => initialState
    },
    extraReducers:(builder) => {

        //update status ticket
        builder.addCase(deleteTicket.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(deleteTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //get count
        builder.addCase(GetCountTicket.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(GetCountTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(GetCountTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {resetTicket2} = ticket2Slice.actions;
export default ticket2Slice.reducer;