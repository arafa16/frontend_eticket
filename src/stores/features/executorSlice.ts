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

export const getExecutor: any = createAsyncThunk("user/getExecutor", async(data : any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/user/data/executor`, {
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});



export const executorSlice = createSlice({
    name: "executor",
    initialState,
    reducers:{
        resetExecutor: (state) => initialState
    },
    extraReducers:(builder) => {

        //get executor
        builder.addCase(getExecutor.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getExecutor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getExecutor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {resetExecutor} = executorSlice.actions;
export default executorSlice.reducer;