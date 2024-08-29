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

export const getStatusNote: any = createAsyncThunk("note/getStatusNote", async(_, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/status_note/select`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const statusNoteSlice = createSlice({
    name: "statusNote",
    initialState,
    reducers:{
        resetStatusNote: (state) => initialState
    },
    extraReducers:(builder) => {
        //login
        builder.addCase(getStatusNote.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getStatusNote.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getStatusNote.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {resetStatusNote} = statusNoteSlice.actions;
export default statusNoteSlice.reducer;