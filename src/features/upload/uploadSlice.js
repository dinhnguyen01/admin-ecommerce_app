import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

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
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

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
      });
  },
});

export default uploadSlice.reducer;
