import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const registerHandler = (e) => {};
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <form onSubmit={registerHandler}>
        <input
          type="text"
          className="w-30 h-8 focus:ring-blue-600 border-blue-300"
        />
        <button className="text-whit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
