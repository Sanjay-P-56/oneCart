import React from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { useState } from "react";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { useEffect } from "react";
import { SiEbox } from "react-icons/si";

function Orders() {
  let [orders, setOrders] = useState([]);
  let { serverUrl } = useContext(authDataContext);

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/list",
        {},
        { withCredentials: true }
      );
      setOrders(result.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler=async(e,orderId)=>{
    try {
      const result=await axios.post(serverUrl+'/api/order/status',{orderId,status:e.target.value},{withCredentials:true})

      if(result.data){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0c2025] via-[#141414] to-[#0f1419] text-white overflow-x-hidden relative">
      <Nav />
      <div className="w-full h-full flex items-start lg:justify-start justify-center">
        <Sidebar />
        <div className="lg:w-[calc(100%-310px)] w-full lg:ml-[310px] mt-[70px] flex flex-col gap-8 px-4 md:px-8 py-12 max-w-[1600px]">
          <div className="w-full">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              All Orders List
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
          </div>

          <div className="flex flex-col gap-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="w-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/50 overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-6 md:p-8">
                  {/* Icon Section */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                      <SiEbox className="w-10 h-10 md:w-12 md:h-12 text-white" />
                    </div>
                  </div>

                  {/* Items and Address Section */}
                  <div className="flex-grow space-y-4 min-w-0">
                    {/* Order Items */}
                    <div className="space-y-1">
                      <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Order Items</h3>
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm md:text-base text-cyan-300 font-medium">
                          {item.name.toUpperCase()} × {item.quantity}{" "}
                          <span className="text-slate-400 text-xs">({item.size})</span>
                          {index !== order.items.length - 1 && <span className="text-slate-600">,</span>}
                        </p>
                      ))}
                    </div>

                    {/* Delivery Address */}
                    <div className="space-y-1 pt-2 border-t border-slate-700/50">
                      <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Delivery Address</h3>
                      <div className="text-sm text-emerald-300 space-y-0.5">
                        <p className="font-semibold text-emerald-200">
                          {order.address.firstName + " " + order.address.lastName}
                        </p>
                        <p>{order.address.street}</p>
                        <p>
                          {order.address.city}, {order.address.state}, {order.address.country} - {order.address.pinCode}
                        </p>
                        <p className="flex items-center gap-2 pt-1">
                          <span className="text-slate-400">📞</span>
                          {order.address.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Details Section */}
                  <div className="flex-shrink-0 bg-slate-800/50 rounded-xl p-4 md:p-5 min-w-[180px] space-y-2 border border-slate-700/30">
                    <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">Order Details</h3>
                    <div className="space-y-2 text-sm">
                      <p className="flex justify-between text-slate-300">
                        <span className="text-slate-400">Items:</span>
                        <span className="font-semibold">{order.items.length}</span>
                      </p>
                      <p className="flex justify-between text-slate-300">
                        <span className="text-slate-400">Method:</span>
                        <span className="font-medium">{order.paymentMethod}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-slate-400">Payment:</span>
                        <span className={`font-semibold ${order.payment ? 'text-green-400' : 'text-amber-400'}`}>
                          {order.payment ? "Done":"pending"}
                        </span>
                      </p>
                      <p className="flex justify-between text-slate-300">
                        <span className="text-slate-400">Date:</span>
                        <span className="font-medium text-xs">{new Date(order.date).toLocaleDateString()}</span>
                      </p>
                      <div className="pt-2 mt-2 border-t border-slate-700/50">
                        <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent text-right">
                          ₹{order.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex-shrink-0 w-full lg:w-auto">
                    <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                      Order Status
                    </label>
                    <select
                      value={order.status}
                      className="w-full lg:w-auto px-4 py-3 bg-slate-700/70 text-white rounded-xl border-2 border-cyan-500/30 hover:border-cyan-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200 font-medium text-sm cursor-pointer appearance-none"
                      onChange={(e)=>statusHandler(e,order._id)}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2306b6d4'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.5rem center',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}
                    >
                      <option value="order Placed">📦 Order Placed</option>
                      <option value="Packing">📋 Packing</option>
                      <option value="Shipped">🚚 Shipped</option>
                      <option value="Out For Delivery">🛵 Out For Delivery</option>
                      <option value="Delivered">✅ Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {orders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <SiEbox className="w-24 h-24 mb-4 opacity-20" />
              <p className="text-xl font-medium">No orders yet</p>
              <p className="text-sm mt-2">Orders will appear here once customers place them</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;