import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import {signin, signup} from '../Services/Authservice';
import Api from "../Axios/Api";

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Api.post("/register", user);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    //console.log("Before API Call");
    const res = await Api.post("/login", user);
    //console.log("After API Call");
    const token = res.data.authorization.token;
    //console.log("Token:", token);
    localStorage.setItem("CC_Token", token);
    //console.log("1231456", res.data);
    return res.data;
  } catch (error) {
    console.error("Error during API Call:", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk("auth/logout", () => {
  localStorage.removeItem("CC_Token");
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    role: null,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
    isLoggedIn: false,
  },
  reducers: {
    //Reducer comes here
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //insert user
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        //state.role = action.payload.role;
        state.isLoading = false;
        state.status = null;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
        state.user = null;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        //console.log("test login", state.isLoggedIn);
        state.isLoggedIn = true;
        console.log("test login", state.isLoggedIn);

        state.user = action.payload.user;
        state.role = action.payload.role;
        //console.log(action.payload.authorization.token);
        localStorage.setItem("CC_Token", action.payload.authorization.token);
      })
      .addCase(login.rejected, (state, action) => {
        //console.log("it came here");
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload.error;
        console.log(state.error);
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
