import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { ShopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import axios from 'axios'

function Order() {

  let [orderData,setOrderData]=useState([])
  const {currency,products}=useContext(ShopDataContext)
  let {serverUrl}=useContext(authDataContext)

  const loadOrderData=async()=>{
    try {
      const result=await axios.post(serverUrl+'/api/order/userorder',{},{withCredentials:true})

      if(result.data){
        let allOrdersItem=[]
        result.data.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status
            item['payment']=order.payment
            item['paymentMethod']=order.paymentMethod
            item['date']=order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[])

  return (
    <div className='w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8 pb-32 overflow-x-hidden bg-gradient-to-br from-[#0c2025] via-[#141414] to-[#0a1a1f]'>

      {/* title */}
      <div className='w-full text-center mt-20 mb-12'>
        <Title text1={'MY '} text2={'ORDERS'}/>
      </div>

      <div className='max-w-7xl mx-auto w-full flex flex-col gap-6'>
        {
          orderData.map((item,index)=>(
            <div key={index} className='w-full bg-gradient-to-r from-[#1a3a42] to-[#2a4a52] rounded-2xl shadow-2xl hover:shadow-cyan-900/20 transition-all duration-300 hover:scale-[1.01] overflow-hidden border border-cyan-900/30'>
              <div className='w-full flex flex-col md:flex-row items-start gap-6 p-5 md:p-6 relative'>
                
                {/* Product Image */}
                <div className='flex-shrink-0'>
                  <img 
                    src={item.image1} 
                    alt={item.name} 
                    className='w-32 h-32 md:w-36 md:h-36 rounded-xl object-cover shadow-lg ring-2 ring-cyan-500/20'
                  />
                </div>

                {/* Product Details */}
                <div className='flex-1 flex flex-col gap-3 min-w-0'>
                  <h3 className='text-xl md:text-2xl font-semibold text-white truncate pr-24 md:pr-0'>
                    {item.name}
                  </h3>
                  
                  <div className='flex flex-wrap items-center gap-4 text-sm md:text-base'>
                    <span className='px-4 py-1.5 bg-cyan-900/40 text-cyan-100 rounded-full font-medium'>
                      {currency}{item.price}
                    </span>
                    <span className='px-4 py-1.5 bg-slate-700/50 text-slate-200 rounded-full'>
                      Qty: {item.quantity}
                    </span>
                    <span className='px-4 py-1.5 bg-slate-700/50 text-slate-200 rounded-full uppercase text-xs md:text-sm font-semibold'>
                      {item.size}
                    </span>
                  </div>

                  {/* Date */}
                  <div className='flex items-center gap-2 text-amber-100/90'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                    </svg>
                    <p className='text-sm md:text-base'>
                      <span className='font-medium'>Date:</span>
                      <span className='ml-2 text-amber-200/80'>{new Date(item.date).toDateString()}</span>
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className='flex items-center gap-2 text-amber-100/90'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' />
                    </svg>
                    <p className='text-sm md:text-base'>
                      <span className='font-medium'>Payment:</span>
                      <span className='ml-2 text-amber-200/80 capitalize'>{item.paymentMethod}</span>
                    </p>
                  </div>
                </div>

                {/* Status Badge - Desktop */}
                <div className='hidden md:flex absolute right-6 top-6 items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/40 backdrop-blur-sm'>
                  <span className='w-2 h-2 rounded-full bg-green-400 animate-pulse'></span>
                  <p className='text-sm font-semibold text-green-100 whitespace-nowrap'>{item.status}</p>
                </div>

                {/* Status Badge - Mobile */}
                <div className='flex md:hidden absolute right-3 top-3 items-center gap-1.5 px-3 py-1.5 bg-green-500/20 rounded-full border border-green-500/40 backdrop-blur-sm'>
                  <span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse'></span>
                  <p className='text-xs font-semibold text-green-100'>{item.status}</p>
                </div>

                {/* Track Order Button */}
                <div className='w-full md:w-auto md:absolute md:right-6 md:bottom-6 mt-2 md:mt-0'>
                  <button 
                    className='w-full md:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white text-sm md:text-base font-medium shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#1a3a42]' 
                    onClick={loadOrderData}
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))
        }
        
        {orderData.length === 0 && (
          <div className='text-center py-20 text-slate-400'>
            <p className='text-xl'>No orders found</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default Order;