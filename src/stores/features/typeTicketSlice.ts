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

export const getSelectTypeTicket: any = createAsyncThunk("typeTicket/getSelectTypeTicket", async(_, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+'/type_ticket/select',{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });
        
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const typeTicketSlice = createSlice({
    name: "typeTicket",
    initialState,
    reducers:{
        resetTypeTicket: (state) => initialState
    },
    extraReducers:(builder) => {
        //login
        builder.addCase(getSelectTypeTicket.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getSelectTypeTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getSelectTypeTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {resetTypeTicket} = typeTicketSlice.actions;
export default typeTicketSlice.reducer;