import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 text-white text-center px-6">
      {/* Glowing 404 Text */}
      <h1 className="text-[80px] md:text-[120px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#65d8f7] to-[#00ffa3] drop-shadow-[0_0_25px_#46d1f7] animate-pulse">
        404
      </h1>

      {/* Subheading */}
      <h2 className="text-[22px] md:text-[30px] font-semibold mt-4 text-[#e2e2e2]">
        Oops! Page Not Found
      </h2>

      {/* Description */}
      <p className="text-[16px] md:text-[18px] text-gray-400 mt-2 max-w-[500px] leading-relaxed">
        The page you’re looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/login")}
        className="mt-8 px-[30px] py-[14px] rounded-full bg-[#65d8f7] text-black font-semibold text-[18px] shadow-lg hover:shadow-[0_0_20px_#46d1f7] hover:scale-105 active:scale-95 transition-all duration-300"
      >
        Go to Login
      </button>

      {/* Optional small link */}
      <button
        onClick={() => navigate("/")}
        className="mt-4 text-[#65d8f7] underline hover:text-[#00ffa3] text-[16px]"
      >
        Return to Home
      </button>
    </div>
  );
}

export default NotFound;
