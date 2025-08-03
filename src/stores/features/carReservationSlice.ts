import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface variabel {
  data: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: variabel = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getCarReservationTable: any = createAsyncThunk(
  "note/getCarReservationTable",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/car_reservation/data?${datas}`,
        {
          withCredentials: true, // Now this is was the missing piece in the client side
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response);
      }
    }
  }
);

export const getCarReservationById: any = createAsyncThunk(
  "note/getCarReservationById",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/car_reservation/data/${datas.uuid}`,
        {
          withCredentials: true, // Now this is was the missing piece in the client side
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response);
      }
    }
  }
);

export const createCarReservation: any = createAsyncThunk(
  "note/createCarReservation",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_API_URL + `/car_reservation/data`,
        datas,
        {
          withCredentials: true, // Now this is was the missing piece in the client side
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response);
      }
    }
  }
);

export const updateCarReservation: any = createAsyncThunk(
  "note/updateCarReservation",
  async (datas: any, thunkAPI) => {
    try {
      console.log(datas.value, 'data feature')
      const response = await axios.patch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/car_reservation/data/${datas.uuid}`,
        datas.value,
        {
          withCredentials: true, // Now this is was the missing piece in the client side
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response);
      }
    }
  }
);

export const deleteCarReservation: any = createAsyncThunk(
  "note/deleteCarReservation",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/car_reservation/data/${datas.uuid}`,
        {
          withCredentials: true, // Now this is was the missing piece in the client side
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response);
      }
    }
  }
);

export const carReservationSlice = createSlice({
  name: "carReservation",
  initialState,
  reducers: {
    resetCarReservation: (state) => initialState,
  },
  extraReducers: (builder) => {
    //by id
    builder.addCase(getCarReservationById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCarReservationById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(getCarReservationById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(getCarReservationTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCarReservationTable.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(getCarReservationTable.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(createCarReservation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCarReservation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(createCarReservation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(updateCarReservation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCarReservation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(updateCarReservation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(deleteCarReservation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCarReservation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(deleteCarReservation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetCarReservation } = carReservationSlice.actions;
export default carReservationSlice.reducer;
