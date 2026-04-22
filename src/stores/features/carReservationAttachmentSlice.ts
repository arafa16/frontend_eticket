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

export const uploadCarReservationAttachment: any = createAsyncThunk(
  "car_reservation_attachment/uploadAttachment",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/car_reservation_attachment/data/${datas.uuid}`,
        datas.formData,
        {
          withCredentials: true, // Now this is was the missing piece in the client side
        },
      );

      return response.data;
    } catch (error: any) {
      if (error) {
        return thunkAPI.rejectWithValue(error.response);
      }
    }
  },
);

export const deleteCarReservationAttachment: any = createAsyncThunk(
  "car_reservation_attachment/deleteAttachment",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/car_reservation_attachment/data/${datas.uuid}`,
        {
          withCredentials: true, // Now this is was the missing piece in the client side
        },
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response);
      }
    }
  },
);

export const carReservationAttachmentSlice = createSlice({
  name: "car_reservation_attachment",
  initialState,
  reducers: {
    resetCarReservationAttachment: (state) => initialState,
  },
  extraReducers: (builder) => {
    //attachment
    builder.addCase(uploadCarReservationAttachment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      uploadCarReservationAttachment.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      },
    );
    builder.addCase(
      uploadCarReservationAttachment.rejected,
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      },
    );

    //delete attachment
    builder.addCase(deleteCarReservationAttachment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteCarReservationAttachment.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      },
    );
    builder.addCase(
      deleteCarReservationAttachment.rejected,
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      },
    );
  },
});

export const { resetCarReservationAttachment } =
  carReservationAttachmentSlice.actions;
export default carReservationAttachmentSlice.reducer;
