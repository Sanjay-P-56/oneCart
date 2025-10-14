import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from "../context/UserContext";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { authDataContext } from "../context/AuthContext";

function Nav() {
  let [showSearch, setShowSearch] = useState(false);
  let [showProfile, setShowProfile] = useState(false);
  let { getCurrentUser,userData } = useContext(userDataContext);
  let {serverUrl}=useContext(authDataContext)
  let navigate = useNavigate();

  const handleLogout=async()=>{
    try {
      const result=await axios.get(serverUrl+"/api/auth/logout",{withCredentials:true})
    console.log(result.data)
    getCurrentUser()

    } catch (error) {
      console.log(error)
    }
    

  }
  return (
    <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed-top flex items-center justify-between px-[30px] shadow-md shadow-black relative">
      <div className="w-[30px] flex items-center justify-start gap-[10px]">
        <img className="w-[50px]" src={logo} alt="logo" />
        <h1 className="text-[25px]">OneCart</h1>
      </div>

      <div className="w-[20%] hidden md:flex">
        <ul className="flex items-center justify-center gap-[19px] text-[white]">
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl">
            HOME
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl">
            COLLECTIONS
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl">
            ABOUT
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl">
            CONTACT
          </li>
        </ul>
      </div>

      <div className="w-[30%] flex items-center justify-end gap-[20px]">
        {!showSearch && (
          <IoSearchCircleOutline
            className="w-[38px] h-[38px] text-[#000000] cursor-pointer"
            onClick={() => {
              setShowSearch((prev) => !prev);
            }}
          />
        )}
        {!userData && (
          <FaRegUserCircle className="w-[29px] h-[29px] text-[#000000] cursor-pointer"  onClick={() => {
              setShowProfile((prev) => !prev);
            }}/>
        )}
        {userData && (
          <div
            className="w-[29px] h-[29px] bg-[#080808] text-[white] rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => {
              setShowProfile((prev) => !prev);
            }}
          >
            {userData?.name.slice(0, 1)}
          </div>
        )}
        <MdOutlineShoppingCart className="w-[29px] h-[29px] text-[#000000] cursor-pointer hidden md:block" />
        <p className="absolute rounded-full bg-black w-[18px] h-[18px] text-[white] flex justify-center items-center  py-[5px] px-[5px] bottom-[45px] right-[23px]">
          10
        </p>
      </div>

      {showSearch && (
        <div className="w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex items-center justify-center">
          <input
            type="text"
            className="w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] text-white text-[18px]"
            placeholder="Search Here"
          />
        </div>
      )}
      {showSearch && (
        <div
          className="flex absolute top-24 right-7"
          onClick={() => setShowSearch((prev) => !prev)}
        >
          <ImCross className="w-[18px] h-[18px] opacity-50" />
        </div>
      )}
      {showProfile && (
        <div className="absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10">
          <ul className="text-white w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] px-[10px]">
            {!userData && (
              <li
                className="w-[100%] hover:bg-gray-600 rounded-[10px] px-[10px] cursor-pointer"
                onClick={() => {
                  navigate("/login");
                  setShowProfile(false)
                }}
              >
                Login
              </li>
            )}
            {userData && (
              <li className="w-[100%] hover:bg-gray-600 rounded-[10px] px-[10px] cursor-pointer" onClick={()=>{
                handleLogout();
                setShowProfile(false)
                navigate("/login")
              }}>
                Logout
              </li>
            )}
            <li className="w-[100%] hover:bg-gray-600 rounded-[10px] px-[10px] cursor-pointer">
              Orders
            </li>
            <li className="w-[100%] hover:bg-gray-600 rounded-[10px] px-[10px] cursor-pointer">
              About
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Nav;
