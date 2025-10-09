import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import {useNavigate} from 'react-router-dom'

function Sidebar() {
  let navigate=useNavigate();
  return (
    <div className='w-[18%] min-h-[100vh] py-[60px] border-r-[1px] border-gray-700 fixed left-0 top-0 bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      <div className='flex flex-col gap-4 pt-[40px] text-[15px] px-4'>
        
        <div className='flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-[#15414c] hover:shadow-lg hover:scale-105 transition-all duration-300 border border-transparent hover:border-[#1e5a68] group' onClick={()=>{navigate("/add")}}>
          <IoIosAddCircleOutline className='text-[24px] text-teal-400 group-hover:text-teal-300 transition-colors'/>
          <p className='text-[17px] font-medium hidden md:block text-gray-200 group-hover:text-white transition-colors'>Add Items</p>
        </div>
        
        <div className='flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-[#15414c] hover:shadow-lg hover:scale-105 transition-all duration-300 border border-transparent hover:border-[#1e5a68] group' onClick={()=>{navigate("/lists")}}>
          <FaRegListAlt className='text-[20px] text-teal-400 group-hover:text-teal-300 transition-colors'/>
          <p className='text-[17px] font-medium hidden md:block text-gray-200 group-hover:text-white transition-colors'>List Items</p>
        </div>
        
        <div className='flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-[#15414c] hover:shadow-lg hover:scale-105 transition-all duration-300 border border-transparent hover:border-[#1e5a68] group' onClick={()=>{navigate("/orders")}}>
          <SiTicktick className='text-[20px] text-teal-400 group-hover:text-teal-300 transition-colors'/>
          <p className='text-[17px] font-medium hidden md:block text-gray-200 group-hover:text-white transition-colors'>View Orders</p>
        </div>

      </div>
    </div>
  )
}

export default Sidebar;