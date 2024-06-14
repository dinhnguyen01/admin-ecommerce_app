import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bcategoryService from "./bcategoryService";

export const getBcategories = createAsyncThunk(
  "blog-category/get-categories",
  async (thunkAPI) => {
    try {
      return await bcategoryService.getBcategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBcategory = createAsyncThunk(
  "blog-category/create-category",
  async (bcategoryData, thunkAPI) => {
    try {
      return await bcategoryService.createBcategory(bcategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABcategory = createAsyncThunk(
  "blog-category/get-category",
  async (id, thunkAPI) => {
    try {
      return await bcategoryService.getBcategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBcategory = createAsyncThunk(
  "blog-category/update-category",
  async (brand, thunkAPI) => {
    try {
      return await bcategoryService.updateBcategory(brand);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBcategory = createAsyncThunk(
  "blog-category/delete-category",
  async (id, thunkAPI) => {
    try {
      return await bcategoryService.deleteBcategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  bcategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const resetState = createAction("Reset_all");

export const bcategorySlice = createSlice({
  name: "bcategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBcategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBcategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bcategories = action.payload;
      })
      .addCase(getBcategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBcategory = action.payload;
      })
      .addCase(createBcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getABcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bcategoryName = action.payload.title;
      })
      .addCase(getABcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBcategory = action.payload;
      })
      .addCase(updateBcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBcategory = action.payload;
      })
      .addCase(deleteBcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default bcategorySlice.reducer;
