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

export const LoginUser: any = createAsyncThunk("auth/LoginUser", async(data : any, thunkAPI) => {
    try {
        const response = await axios.post(import.meta.env.VITE_REACT_APP_API_URL+'/auth/login', {
            email: data.email,
            password: data.password
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

export const RegisterUser: any = createAsyncThunk("auth/RegisterUser", async(data : any, thunkAPI) => {
    try {
        const response = await axios.post(import.meta.env.VITE_REACT_APP_API_URL+'/auth/register', {
            name:data.name,
            email: data.email,
            password: data.password,
            nomor_hp:data.nomor_hp,
            devisi_id:data.devisi_id,
            penempatan_id:data.penempatan_id,
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

export const EmailResetPassword: any = createAsyncThunk("auth/EmailResetPassword", async(data : any, thunkAPI) => {
    try {
        const response = await axios.post(import.meta.env.VITE_REACT_APP_API_URL+`/auth/mail`, {
            email: data.email
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

export const GetTokenReset: any = createAsyncThunk("auth/GetTokenReset", async(data : any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/auth/reset/${data.token}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const Logout: any = createAsyncThunk("auth/Logout", async(_, thunkAPI) => {
    
    try {
        const response = await axios.delete(import.meta.env.VITE_REACT_APP_API_URL+'/auth/logout',{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        resetAuth: (state) => initialState
    },
    extraReducers:(builder) => {
        //login
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //register
        builder.addCase(RegisterUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(RegisterUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(RegisterUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //Email Reset Password
        builder.addCase(EmailResetPassword.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(EmailResetPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(EmailResetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //get token
        builder.addCase(GetTokenReset.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(GetTokenReset.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(GetTokenReset.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //logout
        builder.addCase(Logout.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(Logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(Logout.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {resetAuth} = authSlice.actions;
export default authSlice.reducer;