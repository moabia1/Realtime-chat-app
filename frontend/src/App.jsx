import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import { getUser } from './store/slice/authSlice';
import { setOnlineUsers } from './store/slice/authSlice';
import { connectSocket, disconnectSocket } from './lib/socket';
import {Loader} from "lucide-react"
import Navbar from './components/Navbar';
import MainRoute from './routes/MainRoute';

const App = () => {
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])
  
  useEffect(() => {
    if (authUser) {
      const socket = connectSocket(authUser._id)

      socket.on("getOnlineUser", (users) => {
        dispatch(setOnlineUsers(users))
      })

      return () => disconnectSocket();
    }
  }, [authUser,dispatch])
  

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }
  return (
    <div>
      <Navbar />
      <MainRoute/>
    </div>
  )
}

export default App