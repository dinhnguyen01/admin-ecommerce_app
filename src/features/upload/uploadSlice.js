import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const upload_primaryImg = createAsyncThunk(
  "upload/image-primary",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("files", data[i]);
      }
      return await uploadService.upload_preImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const delete_primaryImg = createAsyncThunk(
  "delete/image-primary",
  async (filename, thunkAPI) => {
    try {
      await uploadService.delete_preImg(filename);
      return filename;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const upload_preImg = createAsyncThunk(
  "upload/image",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("files", data[i]);
      }
      return await uploadService.upload_preImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const delete_preImg = createAsyncThunk(
  "delete/image",
  async (filename, thunkAPI) => {
    try {
      await uploadService.delete_preImg(filename);
      return filename;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  images: [],
  primaryImage: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const resetState_upload = createAction("Reset_all");

export const uploadSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(upload_preImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upload_preImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = [...state.images, ...action.payload.resultFiles];
      })
      .addCase(upload_preImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(upload_primaryImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upload_primaryImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        if (action.payload.resultFiles.length > 0) {
          state.primaryImage = action.payload.resultFiles[0].url;
        } else {
          state.primaryImage = "";
        }
      })
      .addCase(upload_primaryImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(delete_preImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delete_preImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = state.images.filter(
          (x) => x.url.indexOf(action.payload) < 0
        );
      })
      .addCase(delete_preImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(delete_primaryImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delete_primaryImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.primaryImage = "";
      })
      .addCase(delete_primaryImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetState_upload, () => initialState);
  },
});

export default uploadSlice.reducer;
