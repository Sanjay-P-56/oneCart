import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/authContext";
import { ShopDataContext } from "../context/ShopContext";

function Nav() {
  let { showSearch, setShowSearch, search, setSearch, getCartCount } =
    useContext(ShopDataContext);
  const [showProfile, setShowProfile] = useState(false);
  const { getCurrentUser, userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);

      await getCurrentUser(); // refresh auth state
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[70px] bg-[white] z-10 fixed top-0 flex items-center px-[30px] shadow-md shadow-black">
      {/* Left Section (Logo) */}
      <div className="flex-1 flex items-center gap-[10px]">
        <img
          className="w-[50px]"
          src={logo}
          alt="logo"
          onClick={() => Navigate("/")}
        />
        <h1 className="text-[25px]" onClick={() => Navigate("/")}>
          OneCart
        </h1>
      </div>

      {/* Center Section (Menu - perfectly centered) */}
      <div className="flex-1 hidden md:flex justify-center">
        <ul className="flex items-center gap-[19px] text-white">
          <Link to="/">
            <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl">
              HOME
            </li>
          </Link>
          <Link to="/collections">
            <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl">
              COLLECTIONS
            </li>
          </Link>
          <Link to="/about">
            <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl">
              ABOUT
            </li>
          </Link>
          <Link to="/contact">
            <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl">
              CONTACT
            </li>
          </Link>
        </ul>
      </div>

      {/* Right Section (Search, Profile, Cart) */}
      <div className="flex-1 flex items-center justify-end gap-[20px]">
        {!showSearch && (
          <IoSearchCircleOutline
            className="w-[38px] h-[38px] text-black cursor-pointer"
            onClick={() => {
              setShowSearch((prev) => !prev);
              navigate("/collections");
            }}
          />
        )}
        {showSearch && (
          <IoSearchCircleOutline
            className="w-[38px] h-[38px] text-black cursor-pointer"
            onClick={() => {
              setShowSearch((prev) => !prev);
            }}
          />
        )}

        {!userData ? (
          <FaRegUserCircle
            className="w-[29px] h-[29px] text-black cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          />
        ) : (
          <div
            className="w-[29px] h-[29px] bg-black text-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            {userData?.name?.[0]?.toUpperCase()}
          </div>
        )}

        {/* Cart with badge */}
        <div className="relative hidden md:block">
          <MdOutlineShoppingCart
            className="w-[29px] h-[29px] text-black cursor-pointer"
            onClick={() => navigate("/cart")}
          />
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-[18px] h-[18px] text-xs bg-black text-white rounded-full">
            {getCartCount()}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="w-full h-[80px] bg-[#d8f6f9dd] absolute top-[100%]  left-0 flex items-center justify-center px-5">
          <div className="relative w-[50%] h-[60%]">
            <input
              type="text"
              className="w-full h-full bg-[#233533] rounded-[30px] px-[50px] text-white text-[18px] pr-10"
              placeholder="Search Here"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
            />
          </div>
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border border-[#aaa9a9] rounded-[10px] z-10">
          <ul className="text-white w-full h-full flex flex-col justify-around text-[17px] py-[10px] px-[10px]">
            {!userData && (
              <li
                className="w-full hover:bg-gray-600 rounded-[10px] px-[10px] cursor-pointer"
                onClick={() => {
                  navigate("/login");
                  setShowProfile(false);
                }}
              >
                Login
              </li>
            )}
            {userData && (
              <li
                className="w-full hover:bg-gray-600 rounded-[10px] px-[10px] cursor-pointer"
                onClick={() => {
                  handleLogout();
                  setShowProfile(false);
                }}
              >
                Logout
              </li>
            )}
            <li
              className="w-full hover:bg-gray-600 rounded-[10px] px-[10px] cursor-pointer"
              onClick={() => {
                navigate("/order");
                setShowProfile(false);
              }}
            >
              Orders
            </li>
            <li
              className="w-full hover:bg-gray-600 rounded-[10px] px-[10px] cursor-pointer"
              onClick={() => {
                navigate("/about");
                setShowProfile(false);
              }}
            >
              About
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Nav;
