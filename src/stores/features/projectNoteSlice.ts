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

export const getDatas: any = createAsyncThunk("note/getDatas", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/project_note/data?${datas}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const deleteData: any = createAsyncThunk("note/deleteData", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.delete(import.meta.env.VITE_REACT_APP_API_URL+`/project_note/data/${datas.uuid}`,{
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

export const createData: any = createAsyncThunk("note/createData", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.post(import.meta.env.VITE_REACT_APP_API_URL+`/project_note/data`,{
            project_uuid:datas.project_uuid, 
            user_uuid:datas.user_uuid, 
            description:datas.description, 
            project_note_status_uuid:datas.project_note_status_uuid
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

export const updateData: any = createAsyncThunk("note/updateData", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.patch(import.meta.env.VITE_REACT_APP_API_URL+`/project_note/data/${datas.project_note_uuid}`,{
            project_uuid:datas.project_uuid, 
            description:datas.description, 
            project_note_status_uuid:datas.project_note_status_uuid
        },{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        console.log('sampai 2')

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const projectNoteSlice = createSlice({
    name: "projectNote",
    initialState,
    reducers:{
        resetDatas: (state) => initialState
    },
    extraReducers:(builder) => {
        //getDatas
        builder.addCase(getDatas.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getDatas.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getDatas.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //deleteDatas
        builder.addCase(deleteData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(deleteData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //create Datas
        builder.addCase(createData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(createData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //update Datas
        builder.addCase(updateData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(updateData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {resetDatas} = projectNoteSlice.actions;
export default projectNoteSlice.reducer;