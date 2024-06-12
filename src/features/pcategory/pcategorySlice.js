import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pcategoryService from "./pcategoryService";

export const getPcategories = createAsyncThunk(
  "product-category/get-categories",
  async (thunkAPI) => {
    try {
      return await pcategoryService.getPcategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createPcategory = createAsyncThunk(
  "product-category/create-category",
  async (pcategoryData, thunkAPI) => {
    try {
      return await pcategoryService.createPcategory(pcategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  pcategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const resetState = createAction("Reset_all");

export const pcategorySlice = createSlice({
  name: "pcategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPcategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPcategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pcategories = action.payload;
      })
      .addCase(getPcategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createPcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdPcategory = action.payload;
      })
      .addCase(createPcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default pcategorySlice.reducer;
