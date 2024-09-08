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


export const getPrivilegeById: any = createAsyncThunk("privilege/getPrivilegeById", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/privilege/data/${datas.uuid}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });
        
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const updatePrivilege: any = createAsyncThunk("privilege/updatePrivilege", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.patch(import.meta.env.VITE_REACT_APP_API_URL+`/privilege/data/${datas.uuid}`,{
            dashboard:datas.dashboard,
            ticket_requestor:datas.ticket_requestor,
            ticket_executor:datas.ticket_executor,
            entity:datas.entity,
            admin:datas.admin
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


export const privilegeSlice = createSlice({
    name: "privilege",
    initialState,
    reducers:{
        resetPrivilege: (state) => initialState
    },
    extraReducers:(builder) => {

        //privilege by id
        builder.addCase(getPrivilegeById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPrivilegeById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getPrivilegeById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        builder.addCase(updatePrivilege.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updatePrivilege.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(updatePrivilege.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {resetPrivilege} = privilegeSlice.actions;
export default privilegeSlice.reducer;