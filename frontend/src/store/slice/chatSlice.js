import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../lib/axios"
import { toast } from "react-toastify";

export const getUsers = createAsyncThunk("chat/getuser", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/messages/users");
    return  res.data.users
  } catch (error) {
    const payload = error.response?.data?.message;
    toast.error(error.response?.data?.message)
    return thunkAPI.rejectWithValue(payload)
  }
})

export const getMessages = createAsyncThunk("/user/message", async (userId, thunkAPI) => {
  try {
    const res = await axiosInstance.get(`/messages/${userId}`)
    return res.data
  } catch (error) {
    toast.error(error.reponse.data.message);
    const payload = error.response?.data?.message
    thunkAPI.rejectWithValue(payload)
  }
})

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading:false
  },
  reducers: {
    setSelectedUser: (state, action)=>{
      state.selectedUser = action.payload
    },
    pushNewMessage: (state, action) => {
      state.messages.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) =>{
      state.isUsersLoading = true
    })
      .addCase(getUsers.fulfilled, (state,action) =>{
        state.isUsersLoading = false;
        state.users = action.payload
      })
      .addCase(getUsers.rejected, (state) => {
      state.isUsersLoading = false
      })
      .addCase(getMessages.pending, (state) => {
      state.isMessagesLoading = true
    })
      .addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload
      state.isMessagesLoading = false
    })
      .addCase(getMessages.rejected, (state) => {
      state.isMessagesLoading = false
    })
  }
})

export const { setSelectedUser, pushNewMessage } = chatSlice.actions;

export default chatSlice.reducer;