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

export const getPcategory = createAsyncThunk(
  "product-category/get-category",
  async (id, thunkAPI) => {
    try {
      return await pcategoryService.getPcategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatePcategory = createAsyncThunk(
  "product-category/update-category",
  async (pcategory, thunkAPI) => {
    try {
      return await pcategoryService.updatePcategory(pcategory);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePcategory = createAsyncThunk(
  "product-category/delete-category",
  async (id, thunkAPI) => {
    try {
      return await pcategoryService.deletePcategory(id);
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
      .addCase(getPcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pcategoryName = action.payload.title;
      })
      .addCase(getPcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updatePcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedPcategory = action.payload;
      })
      .addCase(updatePcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deletePcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBrand = action.payload;
      })
      .addCase(deletePcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default pcategorySlice.reducer;
