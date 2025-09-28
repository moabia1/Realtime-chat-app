import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

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
    selectedUser: (state, action)=>{
      state.selectedUser = action.payload
    },
    pushNewMessage: (state, action) => {
      state.message.push(action.payload)
    }
  },
})

export const { selectedUser, pushNewMessage } = chatSlice.actions;

export default chatSlice.reducer;