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

export const GetTicket: any = createAsyncThunk("slider/GetTicket", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/ticket?${datas}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const GetTicketUser: any = createAsyncThunk("slider/GetTicketUser", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/ticket/user?${datas}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const GetTicketPic: any = createAsyncThunk("slider/GetTicketPic", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/ticket/pic?${datas}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const GetTicketById: any = createAsyncThunk("ticket/GetTicketById", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/ticket/data?${datas}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

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

export const createTicket: any = createAsyncThunk("ticket/createTicket", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.post(import.meta.env.VITE_REACT_APP_API_URL+`/ticket/`,{
            user_uuid:datas.user_uuid,
            executor_uuid:datas.executor_uuid, 
            description:datas.description, 
            type_ticket_uuid:datas.type_ticket_uuid,
            status_ticket_uuid:datas.status_ticket_uuid
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

export const updateTicket: any = createAsyncThunk("ticket/updateTicket", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.patch(import.meta.env.VITE_REACT_APP_API_URL+`/ticket/${datas.uuid}`,{
            user_uuid:datas.user_uuid,
            executor_uuid:datas.executor_uuid, 
            description:datas.description, 
            type_ticket_uuid:datas.type_ticket_uuid
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

export const UpdateStatusTicket: any = createAsyncThunk("ticket/UpdateStatusTicket", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.patch(import.meta.env.VITE_REACT_APP_API_URL+`/ticket/status/${datas.uuid}`,{
            status_ticket_uuid:datas.status_ticket_uuid
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

export const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers:{
        resetTicket: (state) => initialState
    },
    extraReducers:(builder) => {
        //GetTicket
        builder.addCase(GetTicket.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(GetTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(GetTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //GetTicketUser
        builder.addCase(GetTicketUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(GetTicketUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(GetTicketUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //GetTicketUser
        builder.addCase(GetTicketPic.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(GetTicketPic.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(GetTicketPic.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //Get Ticket By Id
        builder.addCase(GetTicketById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(GetTicketById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(GetTicketById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //update status ticket
        builder.addCase(UpdateStatusTicket.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(UpdateStatusTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(UpdateStatusTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

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

        //create status ticket
        builder.addCase(createTicket.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(createTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //update status ticket
        builder.addCase(updateTicket.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(updateTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

    }
})

export const {resetTicket} = ticketSlice.actions;
export default ticketSlice.reducer;