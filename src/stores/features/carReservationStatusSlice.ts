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

export const getCarReservationStatusSelect: any = createAsyncThunk("note/getCarReservationStatusSelect", async(_, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/car_reservation_status/select`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const getCarReservationStatusTable: any = createAsyncThunk("note/getCarReservationStatusTable", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/car_reservation_status/data?${datas}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const getCarReservationStatusDatas: any = createAsyncThunk("note/getCarReservationStatusDatas", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/car_reservation_status/data?${datas}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        console.log(response, 'sampai')

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const getCarReservationStatusById: any = createAsyncThunk("note/getCarReservationStatusById", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+`/car_reservation_status/data/${datas.uuid}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const createCarReservationStatus: any = createAsyncThunk("note/createCarReservationStatus", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.post(import.meta.env.VITE_REACT_APP_API_URL+`/car_reservation_status/data`,{
            name:datas.name,
            sequence:datas.sequence, 
            is_select:datas.is_select, 
            is_active:datas.is_active,
            is_delete:datas.is_delete
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

export const updateCarReservationStatus: any = createAsyncThunk("note/updateCarReservationStatus", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.patch(import.meta.env.VITE_REACT_APP_API_URL+`/car_reservation_status/data/${datas.uuid}`,{
            name:datas.name,
            sequence:datas.sequence, 
            is_select:datas.is_select, 
            is_active:datas.is_active,
            is_delete:datas.is_delete
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

export const deleteCarReservationStatus: any = createAsyncThunk("note/deleteCarReservationStatus", async(datas:any, thunkAPI) => {
    try {
        const response = await axios.delete(import.meta.env.VITE_REACT_APP_API_URL+`/car_reservation_status/data/${datas.uuid}`,{
            withCredentials: true, // Now this is was the missing piece in the client side 
        });

        return response.data;
    } catch (error: any) {
        if(error.response){
            return thunkAPI.rejectWithValue(error.response);
        }
    }
});

export const carReservationStatusSlice = createSlice({
    name: "carReservationStatus",
    initialState,
    reducers:{
        resetCarReservationStatus: (state) => initialState
    },
    extraReducers:(builder) => {
        //table
        builder.addCase(getCarReservationStatusSelect.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCarReservationStatusSelect.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getCarReservationStatusSelect.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //datas
        builder.addCase(getCarReservationStatusDatas.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCarReservationStatusDatas.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getCarReservationStatusDatas.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //by id
        builder.addCase(getCarReservationStatusById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCarReservationStatusById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getCarReservationStatusById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        builder.addCase(getCarReservationStatusTable.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCarReservationStatusTable.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        });
        builder.addCase(getCarReservationStatusTable.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        builder.addCase(createCarReservationStatus.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createCarReservationStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(createCarReservationStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        builder.addCase(updateCarReservationStatus.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateCarReservationStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(updateCarReservationStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        builder.addCase(deleteCarReservationStatus.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteCarReservationStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        });
        builder.addCase(deleteCarReservationStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {resetCarReservationStatus} = carReservationStatusSlice.actions;
export default carReservationStatusSlice.reducer;