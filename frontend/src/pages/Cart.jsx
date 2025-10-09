import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { ShopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(ShopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItem])

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0a1f1f] via-[#0c2025] to-[#141414] pt-24 pb-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        
        {/* Title */}
        <div className='mb-8 sm:mb-12'>
          <Title text1={'YOUR '} text2={'CART'} />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
          
          {/* Cart Items Section */}
          <div className='lg:col-span-2 space-y-4'>
            {cartData.length === 0 ? (
              <div className='bg-[#1a2f32] rounded-2xl p-12 text-center border border-[#2a4447]'>
                <p className='text-gray-400 text-lg'>Your cart is empty</p>
              </div>
            ) : (
              cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);

                return (
                  <div 
                    key={index} 
                    className='bg-gradient-to-br from-[#1a2f32] to-[#1c2d2f] rounded-2xl overflow-hidden border border-[#2a4447] hover:border-[#3a5d5d] transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1'
                  >
                    <div className='p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative'>
                      
                      {/* Product Image */}
                      <div className='flex-shrink-0'>
                        <img 
                          src={productData.image1} 
                          alt={productData.name} 
                          className='w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover ring-2 ring-[#518080] ring-opacity-30' 
                        />
                      </div>

                      {/* Product Details */}
                      <div className='flex-1 text-center sm:text-left space-y-3 w-full sm:w-auto'>
                        <h3 className='text-lg sm:text-xl lg:text-2xl text-white font-bold leading-tight'>
                          {productData.name}
                        </h3>

                        <div className='flex items-center justify-center sm:justify-start gap-4 flex-wrap'>
                          <p className='text-xl sm:text-2xl text-[#aaf4e7] font-bold'>
                            {currency}{productData.price}
                          </p>
                          <div className='px-4 py-2 text-sm sm:text-base text-white bg-gradient-to-r from-[#518080] to-[#3a5d5d] rounded-lg border border-[#6a9f9f] font-semibold shadow-md'>
                            Size: {item.size}
                          </div>
                        </div>

                        {/* Quantity Control - Mobile */}
                        <div className='flex items-center justify-center sm:justify-start gap-3 pt-2 sm:hidden'>
                          <label className='text-gray-400 text-sm font-medium'>Quantity:</label>
                          <input
                            type="number"
                            min={1}
                            defaultValue={item.quantity}
                            className='w-20 h-11 text-center text-white text-lg bg-[#2a4447] rounded-lg border-2 border-[#518080] outline-none focus:ring-2 focus:ring-[#aaf4e7] focus:border-transparent transition-all'
                            onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                          />
                        </div>
                      </div>

                      {/* Quantity Control - Desktop */}
                      <div className='hidden sm:flex items-center gap-3'>
                        <input
                          type="number"
                          min={1}
                          defaultValue={item.quantity}
                          className='w-20 h-12 text-center text-white text-lg bg-[#2a4447] rounded-lg border-2 border-[#518080] outline-none focus:ring-2 focus:ring-[#aaf4e7] focus:border-transparent transition-all'
                          onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                        />
                      </div>

                      {/* Delete Button */}
                      <button
                        className='group flex items-center justify-center w-12 h-12 bg-opacity-10 hover:bg-opacity-20 rounded-xl border-2 border-red-500 border-opacity-30 hover:border-opacity-60 transition-all duration-200'
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        aria-label="Remove item"
                      >
                        <RiDeleteBin6Line className='w-6 h-6 text-red-500 group-hover:text-red-400 transition-colors' />
                      </button>

                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Cart Summary Section */}
          <div className='lg:col-span-1'>
            <div className='sticky top-24 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 rounded-2xl p-6 sm:p-8 border border-[#2a4447] shadow-2xl'>
              <CartTotal />
              <button
                className={`mt-6 w-full py-4 text-white text-lg font-bold rounded-xl shadow-lg transition-all duration-300 transform ${
                  cartData.length > 0
                    ? 'bg-gradient-to-r from-[#518080] to-[#3a5d5d] hover:from-[#5a9090] hover:to-[#447070] hover:shadow-2xl hover:-translate-y-1 cursor-pointer'
                    : 'bg-gray-600 cursor-not-allowed opacity-50'
                }`}
                onClick={() => { if(cartData.length > 0) navigate("/placeorder") }}
                disabled={cartData.length === 0}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart;