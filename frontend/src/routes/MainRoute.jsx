import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from "react-router-dom"
import Home from "../pages/Home"
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'

const MainRoute = () => {
  const { authUser } = useSelector((state) => state.auth)
  
  return (
    <div>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login"/>} />
        <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/" />} /> 
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <Profile/> : <Navigate to="/login"/>} />
      </Routes>
    </div>
  )
}

export default MainRoute