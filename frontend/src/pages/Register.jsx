import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { isSigningUp } = useSelector((state) => state.auth)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData))
  };
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      
    </div>
  );
};

export default Register;
