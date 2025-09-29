import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../lib/axios"
import { toast } from "react-toastify";

export const getUsers = createAsyncThunk("chat/getuser", async (_, thunkAPI) => {
  try {
    const res = axiosInstance.get("/messages/users");
    return (await res).data.users
  } catch (error) {
    const payload = error.response?.data?.message;
    toast.error(error.response?.data?.message)
    return thunkAPI.rejectWithValue(payload)
  }
})
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    message: [],
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
      state.message.push(action.payload)
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
  }
})

export const { setSelectedUser, pushNewMessage } = chatSlice.actions;

export default chatSlice.reducer;