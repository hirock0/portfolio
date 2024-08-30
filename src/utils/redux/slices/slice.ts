"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
  isLoading: boolean;
  inCompleted: boolean;
};

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
};

export const AllApiHandler: any = createAsyncThunk(
  "AllApiHandler",
  async (data: any) => {
    // const usersApi = await axios.get("/pages/api/user/login");
    // const users = usersApi?.data.findUser;
    const allPdf = await axios.get("/pages/api/resume_pdfs");
    const Pdf = allPdf?.data?.gotPdf[0]
    const reqApi = await axios.get("/pages/api/admin_api/upload_projects");
    const allData = reqApi?.data?.ProjectsData || "";
    return {products: allData,pdf:Pdf };
  }
);

export const Slice = createSlice({
  name: "Slice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      AllApiHandler.pending,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    ),
      builder.addCase(
        AllApiHandler.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      ),
      builder.addCase(
        AllApiHandler.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.isError = true;
        }
      );
  },
});
export default Slice.reducer;
