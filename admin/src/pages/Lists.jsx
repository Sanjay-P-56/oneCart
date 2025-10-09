import React, { useContext, useEffect, useState } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { ImCross } from "react-icons/im";

function Lists() {
  let [list, setList] = useState([]);
  let { serverUrl } = useContext(authDataContext);

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      setList(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeList=async(id)=>{
    try {
      let result=await axios.post(`${serverUrl}/api/product/remove/${id}`,{},{withCredentials:true})

      if(result.data){
        fetchList()
      }
      else{
        console.log("failed to remove product")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList();
  }, []);
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0c2025] via-[#141414] to-[#0a1a1f] text-white overflow-x-hidden relative">
      <Nav />
      <div className="w-full h-full flex items-start justify-start">
        <Sidebar />

        <div className="w-full lg:w-[82%] lg:ml-[320px] md:ml-[230px] ml-[100px] mt-[70px] flex flex-col overflow-x-hidden py-12 px-4 sm:px-6 lg:px-8 gap-8">
          
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              All Listed Products
            </h1>
            <p className="text-slate-400 mt-2 text-sm md:text-base">
              Manage your product inventory
            </p>
          </div>

          {/* Products List */}
          <div className="flex flex-col gap-4 max-w-6xl">
            {list?.length > 0 ? (
              list.map((item, index) => (
                <div
                  className="w-full bg-gradient-to-r from-slate-700/50 to-slate-600/50 backdrop-blur-sm rounded-2xl flex items-center justify-between gap-4 md:gap-6 p-4 md:p-6 hover:shadow-xl hover:shadow-cyan-900/20 transition-all duration-300 hover:scale-[1.01] border border-slate-500/30 group"
                  key={index}
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image1}
                      alt={item.name}
                      className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl object-cover shadow-lg ring-2 ring-cyan-500/20 group-hover:ring-cyan-500/40 transition-all duration-300"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-center gap-1.5 md:gap-2 min-w-0">
                    <h3 className="text-base md:text-xl lg:text-2xl font-semibold text-cyan-100 truncate group-hover:text-cyan-50 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                      <span className="px-3 py-1 md:px-4 md:py-1.5 bg-blue-500/20 text-blue-200 rounded-full text-xs md:text-sm font-medium border border-blue-500/30">
                        {item.category}
                      </span>
                      <span className="px-3 py-1 md:px-4 md:py-1.5 bg-green-500/20 text-green-200 rounded-full text-xs md:text-sm font-bold border border-green-500/30">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => removeList(item._id)}
                      className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-all duration-300 border border-red-500/30 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/50 active:scale-95 group/btn"
                      aria-label="Delete product"
                    >
                      <svg 
                        className="w-5 h-5 md:w-6 md:h-6 group-hover/btn:rotate-90 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M6 18L18 6M6 6l12 12" 
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-700/30 rounded-full flex items-center justify-center mb-6">
                  <svg 
                    className="w-12 h-12 md:w-16 md:h-16 text-slate-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
                    />
                  </svg>
                </div>
                <p className="text-slate-300 text-xl md:text-2xl font-semibold mb-2">
                  No Products Available
                </p>
                <p className="text-slate-500 text-sm md:text-base text-center">
                  Start by adding your first product to the inventory
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lists;