import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios.js";
import { disconnectSocket } from "../../lib/socket";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk("/user/me", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/user/me");
    return res.data.user;
  } catch (error) {
    const payload =
      error.response?.data || error.message || "Faild to Fetch user";
    return thunkAPI.rejectWithValue(payload);
  }
});

export const logout = createAsyncThunk(
  "/user/sign-out",
  async (_, thunkAPI) => {
    try {
      await axiosInstance.get("/user/sign-out");
      disconnectSocket();
      return null;
    } catch (error) {
      toast.error(error.response.data.message);
      const payload = error.response?.data?.message;
      return thunkAPI.rejectWithValue(payload);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
  },
  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
      })
      .addCase(logout.rejected, (state) => {
        state.authUser = state.authUser;
      });
  },
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
