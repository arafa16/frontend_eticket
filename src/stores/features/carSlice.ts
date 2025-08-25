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

export const getSelectCar: any = createAsyncThunk(
  "car/getSelectCar",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL + "/car/data?is_select=1",
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

export const getCarTable: any = createAsyncThunk(
  "car/getCarTable",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL + `/car/data?${datas}`,
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

export const getCarById: any = createAsyncThunk(
  "car/getCarById",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL + `/car/data/${datas.uuid}`,
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

export const createCar: any = createAsyncThunk(
  "car/createCar",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_API_URL + `/car/data`,
        {
          name: datas.name,
          sequence: datas.sequence,
          is_select: datas.is_select,
          is_active: datas.is_active,
        },
        {
          withCredentials: true, // Now this is was the missing piece in the client side
        }
      );

      console.log(datas, response, "response");

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response);
      }
    }
  }
);

export const updateCar: any = createAsyncThunk(
  "car/updateCar",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.patch(
        import.meta.env.VITE_REACT_APP_API_URL + `/car/data/${datas.uuid}`,
        {
          name: datas.name,
          sequence: datas.sequence,
          is_select: datas.is_select,
          is_active: datas.is_active,
        },
        {
          withCredentials: true, // Now this is was the missing piece in the client side
        }
      );

      console.log(datas, response, "response");

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response);
      }
    }
  }
);

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    resetCar: (state) => initialState,
  },
  extraReducers: (builder) => {
    //car select
    builder.addCase(getSelectCar.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSelectCar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(getSelectCar.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //car table
    builder.addCase(getCarTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCarTable.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(getCarTable.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //car table
    builder.addCase(getCarById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCarById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(getCarById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //create car
    builder.addCase(createCar.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(createCar.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //create car
    builder.addCase(updateCar.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(updateCar.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetCar } = carSlice.actions;
export default carSlice.reducer;
