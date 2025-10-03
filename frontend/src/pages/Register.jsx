import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/slice/authSlice";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import AuthImage from "../components/AuthImage";
import {Link} from "react-router-dom"

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
          <div className="w-full max-w-md">
            {/* Logo and Heading */}
            <div className="flex flex-col items-center text-center mb-10">
              <div className="bg-blue-100 p-3 rounded-lg">
                <MessageSquare className="text-blue-600 w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold mt-4">Create Account</h1>
              <p className="text-gray-500 text-sm mt-2 ">
                Get started with your free account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  FullName
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg py-2 pl-10 font-semibold pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ex: john doe"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-5 h-5" />
                  </span>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg py-2 pl-10 font-semibold pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full border border-gray-300 rounded-lg py-2 pl-10 font-semibold pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSigningUp}
                className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-200 flex justify-center items-center gap-2"
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Loading ...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <AuthImage
          title={"Join our Community"}
          subtitle={
            "connect with friends and family share your thounghts and stay in touch with your loved ones"
          }
        />

      </div>
    </>
  );
};

export default Register;
