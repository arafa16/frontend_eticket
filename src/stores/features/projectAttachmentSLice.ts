import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import fileDownload from "js-file-download";

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

export const uploadAttachment: any = createAsyncThunk("project/uploadAttachment", async(datas : any, thunkAPI) => {
    try {
        const response = await axios.post(import.meta.env.VITE_REACT_APP_API_URL+`/project_attachment/data/${datas.uuid}`, datas.formData,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });
        
        return response.data;
    } catch (error: any) {
        if(error){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const deleteAttachment: any = createAsyncThunk("project/deleteAttachment", async(datas : any, thunkAPI) => {
    try {
        const response = await axios.delete(import.meta.env.VITE_REACT_APP_API_URL+`/project_attachment/data/${datas.uuid}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const downloadAttachment: any = createAsyncThunk("project/downloadAttachment", async(datas : any, thunkAPI) => {

        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`${datas.file_link}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
            responseType: 'blob'
        });

        fileDownload(response.data, `${datas.file_name}`)
});

export const projectAttachmentSlice = createSlice({
    name: "project_attachment",
    initialState,
    reducers:{
        resetData: (state) => initialState
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

export const {resetData} = projectAttachmentSlice.actions;
export default projectAttachmentSlice.reducer;