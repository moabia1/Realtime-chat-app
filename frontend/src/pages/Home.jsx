import React from 'react'
import { useSelector } from "react-redux"
import SideBar from '../components/SideBar'
import NoChatSelected from '../components/NoChatSelected'
import ChatWindow from '../components/ChatWindow'
import ChatContainer from '../components/ChatContainer'


const Home = () => {
  const { selectedUser } = useSelector((state) => state.chat)
  
  
  return (
    <>
      <div className='min-h-screen bg-gray-200'>
        <div className='flex items-center justify-center pt-20 px-4'>
          <div className='bg-white rounded-lg shadow-md w-full max-w-6xl h-[calc(100vh-8rem)]'>
            <div className='flex h-full overflow-hidden'>
              <SideBar />
              {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home