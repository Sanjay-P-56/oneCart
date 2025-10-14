import React, { useContext, useState } from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { userDataContext } from "../context/UserContext";

function Registeration() {
  let [show, setShow] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { userdata, getCurrentUser } = useContext(userDataContext);
    let navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/registeration",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      getCurrentUser();
      navigate("/")
      console.log(result.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const googleSignUp = async (e) => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true }
      );
      console.log(result.data);
      getCurrentUser()
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start">
      <div
        className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <img className="w-[40px]" src={Logo} alt="" />
        <h1 className="text-[22px]">OneCart</h1>
      </div>

      <div className="w-[100%] h-[100px] flex flex-col items-center justify-center gap-[10px]">
        <span className="text-[25px] font-semibold">Registeration Page</span>
        <span className="text-[20px]">
          Welcome to OneCart, Place your order
        </span>
      </div>
      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          action=""
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
          onSubmit={handleSignup}
        >
          {/* Google Button */}
          <div
            className="w-[90%] h-[50px] bg-[#42656cae] border-[1px] border-[#96969635] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer hover:bg-[#42656cce] transition"
            onClick={googleSignUp}
          >
            <img
              className="w-[25px]"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
              alt="Google Logo"
            />
            <span className="text-white font-medium">
              Registration with Google
            </span>
          </div>

          {/* OR divider */}
          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px] text-white text-sm">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div> OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          {/* Input Fields */}
          <div className="w-[90%] flex flex-col items-center justify-center gap-[15px] relative">
            <input
              type="text"
              placeholder="Username"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#96969635] bg-[#ffffff20] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#96969635] bg-[#ffffff20] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#96969635] bg-[#ffffff20] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {!show && (
              <IoEyeOutline
                className="w-[20px] h-[25px] cursor-pointer absolute right-[3%] mt-6"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            {show && (
              <IoEyeOffSharp
                className="w-[20px] h-[25px] cursor-pointer absolute right-[3%] mt-6"
                onClick={() => setShow((prev) => !prev)}
              />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Create Account
            </button>

            {/* Login Link */}
            <p className="text-sm text-gray-300 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-blue-400 hover:underline">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registeration;
