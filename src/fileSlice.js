import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const fileSlice = createSlice({
  name: "config",
  initialState: {
    configFiles: [],
  },
  reducers: {
    addFile: (state, action) => {
      state.configFiles.push({
        id: uuidv4(),
        formData: action.payload,
        uploadedAt: new Date().toISOString(),
      });
    },
  },
});

export const { addFile } = fileSlice.actions;
export default fileSlice.reducer;
