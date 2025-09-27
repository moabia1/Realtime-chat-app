import React, { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const registerHandler = (e) => {};
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      
    </div>
  );
};

export default Register;
