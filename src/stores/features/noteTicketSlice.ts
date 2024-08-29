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

export const getNoteTicket: any = createAsyncThunk("note/getNoteTicket", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/note_ticket/data?${datas}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const deleteNoteTicket: any = createAsyncThunk("note/deleteNoteTicket", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.delete(import.meta.env.VITE_REACT_APP_API_URL+`/note_ticket/data/${datas.uuid}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        console.log(response, 'response');

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const createNoteTicket: any = createAsyncThunk("note/createNoteTicket", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.post(import.meta.env.VITE_REACT_APP_API_URL+`/note_ticket/data`,{
            ticket_uuid:datas.ticket_uuid, 
            user_uuid:datas.user_uuid, 
            description:datas.description, 
            status_note_uuid:datas.status_note_uuid
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

export const updateNoteTicket: any = createAsyncThunk("note/updateNoteTicket", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.patch(import.meta.env.VITE_REACT_APP_API_URL+`/note_ticket/data/${datas.uuid}`,{
            ticket_uuid:datas.ticket_uuid, 
            user_uuid:datas.user_uuid, 
            description:datas.description, 
            status_note_uuid:datas.status_note_uuid
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

export const noteTicketSlice = createSlice({
    name: "noteTicket",
    initialState,
    reducers:{
        resetNoteTicket: (state) => initialState
    },
    extraReducers:(builder) => {
        //getNoteTicket
        builder.addCase(getNoteTicket.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getNoteTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getNoteTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //deleteNoteTicket
        builder.addCase(deleteNoteTicket.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteNoteTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(deleteNoteTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //create NoteTicket
        builder.addCase(createNoteTicket.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createNoteTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(createNoteTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //update NoteTicket
        builder.addCase(updateNoteTicket.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateNoteTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(updateNoteTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {resetNoteTicket} = noteTicketSlice.actions;
export default noteTicketSlice.reducer;