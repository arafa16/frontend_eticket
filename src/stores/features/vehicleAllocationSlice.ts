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

export const getSelectVehicleAllocation: any = createAsyncThunk(
  "vehicle_allocation/getSelectVehicleAllocation",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          "/vehicle_allocation/data?is_select=true",
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

export const getVehicleAllocationTable: any = createAsyncThunk(
  "vehicle_allocation/getVehicleAllocationTable",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/vehicle_allocation/data?${datas}`,
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

export const getVehicleAllocationById: any = createAsyncThunk(
  "vehicle_allocation/getVehicleAllocationById",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/vehicle_allocation/data/${datas.uuid}`,
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

export const createVehicleAllocation: any = createAsyncThunk(
  "vehicle_allocation/createVehicleAllocation",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_API_URL + `/vehicle_allocation/data`,
        {
          name: datas.name,
          sequence: datas.sequence,
          is_select: datas.is_select,
          is_active: datas.is_active,
        },
        {
          withCredentials: true, // Now this is was the missing piece in the client side
        },
      );

      console.log(datas, response, "response");

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response);
      }
    }
  },
);

export const updateVehicleAllocation: any = createAsyncThunk(
  "vehicle_allocation/updateVehicleAllocation",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.patch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/vehicle_allocation/data/${datas.uuid}`,
        {
          name: datas.name,
          sequence: datas.sequence,
          is_select: datas.is_select,
          is_active: datas.is_active,
        },
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

export const vehicleAllocationSlice = createSlice({
  name: "vehicle_allocation",
  initialState,
  reducers: {
    resetVehicleAllocation: (state) => initialState,
  },
  extraReducers: (builder) => {
    //vehicle_allocation select
    builder.addCase(getSelectVehicleAllocation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSelectVehicleAllocation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(getSelectVehicleAllocation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //vehicle_allocation table
    builder.addCase(getVehicleAllocationTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVehicleAllocationTable.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(getVehicleAllocationTable.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //vehicle_allocation table
    builder.addCase(getVehicleAllocationById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVehicleAllocationById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(getVehicleAllocationById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //create vehicle_allocation
    builder.addCase(createVehicleAllocation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createVehicleAllocation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(createVehicleAllocation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //create vehicle_allocation
    builder.addCase(updateVehicleAllocation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateVehicleAllocation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(updateVehicleAllocation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetVehicleAllocation } = vehicleAllocationSlice.actions;
export default vehicleAllocationSlice.reducer;
