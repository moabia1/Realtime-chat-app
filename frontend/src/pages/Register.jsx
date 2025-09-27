import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/slice/authSlice";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isSigningUp } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
  };

  return (
    <>
      <div className="grid grid-cols-1 min-h-screen lg:grid-cols-2 bg-white">
        <div className="flex flex-col justify-center items-center px-6 py-12">
          <div className="w-full max-w-md ">
            {/* Logo and Heading */}
            <div className="flex flex-col items-center text-center mb-10">
              <div className="bg-blue-100 p-3 rounded-lg">
                <MessageSquare className="text-blue-600 w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold mt-4">Welcome Back</h1>
              <p className="text-gray-500 text-sm mt-2 ">
                Sign in to your account
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
