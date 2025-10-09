import React from "react";
import logo from "../vcart logo.png";

function Footer() {
  return (
    <div className="w-full md:h-[36vh] h-[auto] mb-[77px] md:mb-0">
      <div className="w-full md:h-[30vh] h-[auto] bg-[#b9dfdfec] flex flex-col md:flex-row items-start md:items-center justify-between md:px-[50px] px-[20px] py-[20px] gap-[20px]">
        
        {/* Column 1 - Logo & About */}
        <div className="md:w-[30%] w-full flex flex-col items-start gap-[10px]">
          <div className="flex items-center gap-[8px]">
            <img
              src={logo}
              alt="logo"
              className="md:w-[40px] md:h-[40px] w-[30px] h-[30px]"
            />
            <p className="text-[20px] font-semibold text-black">OneCart</p>
          </div>
          <p className="text-[15px] text-[#1e2223] hidden md:block">
            OneCart is your all-in-one online shopping destination, offering
            top-quality products, unbeatable deals, and fast delivery, all backed
            by a trusted service designed to make your life easier every day.
          </p>
          <p className="text-[15px] text-[#1e2223] md:hidden">
            Fast, Easy, Reliable. OneCart Shopping
          </p>
        </div>

        {/* Column 2 - Company Links */}
        <div className="md:w-[20%] w-full flex flex-col items-start md:items-center text-left md:text-center gap-[8px]">
          <p className="text-[19px] md:text-[20px] text-[#1e2223] font-sans font-semibold">
            COMPANY
          </p>
          <ul className="space-y-2">
            <li className="text-[15px] text-[#1e2223] cursor-pointer">Home</li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">About Us</li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer hidden md:block">
              Delivery
            </li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Column 3 - Get in Touch */}
        <div className="md:w-[30%] w-full flex flex-col items-start md:items-center text-left md:text-center gap-[8px]">
          <p className="text-[19px] md:text-[20px] text-[#1e2223] font-sans font-semibold">
            GET IN TOUCH
          </p>
          <ul className="space-y-2">
            <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer">
              +91-8904220517
            </li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">
              contact@onecart.com
            </li>
            <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer">
              +1-123-456-7890
            </li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">
              admin@onecart.com
            </li>
          </ul>
        </div>
      </div>
      <div className="w-[100%] h-[1px] bg-slate-400"></div>
      <div className="w-[100%] h-[5vh] bg-[#dbfcfcec] flex items-center justify-center ">Copyright 2025@onecart.com-All Rights Reservered</div>
    </div>
  );
}

export default Footer;
