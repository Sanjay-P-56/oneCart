import React, { useState, useContext } from "react";
import Logo from "../assets/logo.png";
import { IoEyeOutline, IoEyeOffSharp } from "react-icons/io5";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { adminDataContext } from "../context/AdminContext";
import { toast } from "react-toastify";

function Login() {
  let [show, setShow] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { serverUrl } = useContext(authDataContext);
  let {adminData,getAdmin}=useContext(adminDataContext);

  const AdminLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/adminlogin",
        { email, password },
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success("Admin Logged in Successfully")
      getAdmin()
      navigate("/")
    } catch (error) {
      console.log(error);
      toast.error("Admin Login Failed")
    }
  };
  let navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col">
      {/* Header */}
      <div className="w-full h-[80px] flex items-center gap-3 px-6 cursor-pointer">
        <img className="w-[40px]" src={Logo} alt="OneCart Logo" />
        <h1 className="text-[22px] font-semibold">OneCart</h1>
      </div>

      {/* Page Title */}
      <div className="flex flex-col items-center text-center mt-6 gap-2">
        <span className="text-[28px] font-bold">Admin Login</span>
        <span className="text-[18px] text-gray-300">
          Welcome to OneCart website— login to continue
        </span>
      </div>

      {/* Login Form */}
      <div className="flex flex-1 items-center justify-center mb-[200px]">
        <div className="max-w-[450px] w-[90%] bg-[#00000050] border border-[#96969635] backdrop-blur-2xl rounded-xl shadow-lg p-8">
          <form
            className="flex flex-col gap-6"
            onSubmit={AdminLogin}
          >
            {/* Email Input */}
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#96969635] bg-[#ffffff20] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Password Input with Toggle */}
            <div className="relative w-full">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#96969635] bg-[#ffffff20] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {show ? (
                <IoEyeOffSharp
                  className="w-6 h-6 absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer"
                  onClick={() => setShow((prev) => !prev)}
                />
              ) : (
                <IoEyeOutline
                  className="w-6 h-6 absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer"
                  onClick={() => setShow((prev) => !prev)}
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
