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

export const GetDatas: any = createAsyncThunk("project/GetDatas", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/project/datas?${datas}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const GetDatasByUser: any = createAsyncThunk("project/GetDatasByUser", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/project/user?${datas}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        console.log('respon',response.data)

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const GetDatasByPic: any = createAsyncThunk("project/GetDatasByPic", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/project/pic?${datas}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const GetDataById: any = createAsyncThunk("project/GetDataById", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/project/data?${datas}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });
        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const createData: any = createAsyncThunk("project/createData", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.post(import.meta.env.VITE_REACT_APP_API_URL+`/project/data`,{
            name:datas.name,
            user_uuid:datas.user_uuid,
            executor_uuid:datas.executor_uuid, 
            description:datas.description, 
            project_type_uuid:datas.project_type_uuid,
            project_status_uuid:datas.project_status_uuid,
            target_date:datas.target_date
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

export const updateData: any = createAsyncThunk("project/updateData", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.patch(import.meta.env.VITE_REACT_APP_API_URL+`/project/data/${datas.uuid}`,{
            name:datas.name,
            user_uuid:datas.user_uuid,
            executor_uuid:datas.executor_uuid, 
            description:datas.description, 
            project_type_uuid:datas.project_type_uuid,
            target_date:datas.target_date
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

export const UpdateStatusData: any = createAsyncThunk("project/UpdateStatusData", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.patch(import.meta.env.VITE_REACT_APP_API_URL+`/project/status/${datas.uuid}`,{
            project_status_uuid:datas.project_status_uuid
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

export const deleteData: any = createAsyncThunk("project/deleteData", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.delete(import.meta.env.VITE_REACT_APP_API_URL+`/project/data/${datas.uuid}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers:{
        resetData: (state) => initialState
    },
    extraReducers:(builder) => {
        //GetData
        builder.addCase(GetDatas.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(GetDatas.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(GetDatas.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //GetDatasByUser
        builder.addCase(GetDatasByUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(GetDatasByUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(GetDatasByUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //GetDatasByUser
        builder.addCase(GetDatasByPic.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(GetDatasByPic.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(GetDatasByPic.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //Get Project By Id
        builder.addCase(GetDataById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(GetDataById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(GetDataById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //update status project
        builder.addCase(UpdateStatusData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(UpdateStatusData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(UpdateStatusData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //create status project
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

        //update status project
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

        //delete project
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
    }
})

export const {resetData} = projectSlice.actions;
export default projectSlice.reducer;