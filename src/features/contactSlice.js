import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addContact } from "../Services/CantactService";
export const sendContact = createAsyncThunk(
  "contact/sendContact",
  async (contact, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await addContact(contact);
      console.log("test hear slice");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contact: [],
    isLoading: false,
    success: null,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendContact.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(sendContact.fulfilled, (state, action) => {
        state.contact.push(action.payload);
        state.isLoading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(sendContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});
export default contactSlice.reducer;
