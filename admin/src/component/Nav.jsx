import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../vcart logo.png";
import axios from 'axios'
import { useContext } from "react";
import { adminDataContext } from "../context/AdminContext";
import { authDataContext } from "../context/AuthContext";

function Nav() {
  let navigate = useNavigate();
  let {serverUrl}=useContext(authDataContext)
  let {getAdmin}=useContext(adminDataContext)

  const logout=async()=>{
    try {
      const result=await axios.get(serverUrl+"/api/auth/logout",{withCredentials:true})
      console.log(result.data)
      navigate("/login")

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black">
      <div
        className="flex items-center justify-between gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" className="w-[50px]" />
        <h1 className="text-[25px] text-black font-sans">OneCart</h1>
        
      </div>
              <button className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl " onClick={logout}>Logout</button>

    </div>
  );
}

export default Nav;
