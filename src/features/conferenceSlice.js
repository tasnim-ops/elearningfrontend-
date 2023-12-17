import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchConferenceById,
  fetchConferences,
  addConference,
  editConference,
  delConference,
} from "../Services/ConferenceService";

export const getConferences = createAsyncThunk(
  "conference/getConferences",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetchConferences();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createConference = createAsyncThunk(
  "conference/createConference",
  async (conference, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await addConference(conference);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteConference = createAsyncThunk(
  "conference/deleteConference",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await delConference(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateConference = createAsyncThunk(
  "conference/updateConference",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await editConference(userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const findConferenceByID = createAsyncThunk(
  "conference/findConferenceByID",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetchConferenceById(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);
export const sendConference = createAsyncThunk(
  "conference/sendConference",
  async (conference, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await sendConference(conference);
      //console.log("test hear slice");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const conferenceSlice = createSlice({
  name: "conference",
  initialState: {
    conferences: [],
    conference: {},
    isLoading: false,
    success: null,
    error: null,
  },
  extraReducers: (builder) => {
    //get conferences
    builder
      .addCase(getConferences.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getConferences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.conferences = action.payload;
        state.conference = action.payload;
      })
      .addCase(getConferences.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("can not connect to server");
      })
      //insert conference
      .addCase(createConference.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createConference.fulfilled, (state, action) => {
        state.conferences.push(action.payload);
        state.isLoading = false;
        state.error = null;
        state.success = action.payload;
      })
      .addCase(createConference.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = null;
      })
      //Modification conference
      .addCase(updateConference.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateConference.fulfilled, (state, action) => {
        state.conferences = state.conferences.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.isLoading = false;
        state.error = null;
        state.success = action.payload;
      })
      //delete conference
      .addCase(deleteConference.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteConference.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.conferences = state.conferences.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteConference.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //fetch conference
      .addCase(findConferenceByID.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(findConferenceByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.conference = action.payload;
      })
      //send conference
      .addCase(sendConference.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(sendConference.fulfilled, (state, action) => {
        state.conferences.push(action.payload);
        state.isLoading = false;
        state.error = null;
        state.success = true;
        console.log("test slice success", state.success);
      })
      .addCase(sendConference.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});
export default conferenceSlice.reducer;
