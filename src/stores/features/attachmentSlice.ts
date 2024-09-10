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

export const uploadAttachment: any = createAsyncThunk("file/uploadAttachment", async(datas : any, thunkAPI) => {
    try {
        const response = await axios.post(import.meta.env.VITE_REACT_APP_API_URL+`/attachment_ticket/${datas.uuid}`, datas.formData,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        console.log(response, 'response')
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const deleteAttachment: any = createAsyncThunk("file/deleteAttachment", async(datas : any, thunkAPI) => {
    try {
        const response = await axios.delete(import.meta.env.VITE_REACT_APP_API_URL+`/attachment_ticket/${datas.uuid}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        console.log(response, 'response')
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const attachmentSlice = createSlice({
    name: "attachment",
    initialState,
    reducers:{
        resetAttachment: (state) => initialState
    },
    extraReducers:(builder) => {

        //attachment
        builder.addCase(uploadAttachment.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(uploadAttachment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(uploadAttachment.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //delete attachment
        builder.addCase(deleteAttachment.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteAttachment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(deleteAttachment.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {resetAttachment} = attachmentSlice.actions;
export default attachmentSlice.reducer;