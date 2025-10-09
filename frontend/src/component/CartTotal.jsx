import React, { useContext } from 'react'
import { ShopDataContext } from '../context/ShopContext'
import Title from './Title'

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopDataContext)
  const subtotal = getCartAmount() ?? 0
  const shipping = delivery_fee ?? 0
  const total = subtotal === 0 ? 0 : subtotal + shipping
  const symbol = currency 

  return (
    <div className='w-full'>
      {/* Title Section */}
      <div className='mb-6'>
        <Title text1={'CART '} text2={'TOTALS'} />
      </div>

      {/* Summary Card */}
      <div className='bg-gradient-to-br from-[#1a2f32] to-[#1c2d2f] rounded-2xl border-2 border-[#2a4447] shadow-2xl overflow-hidden'>
        
        {/* Decorative Top Bar */}
        <div className='h-1.5 bg-gradient-to-r from-[#518080] via-[#aaf4e7] to-[#518080]'></div>
        
        <div className='p-6 space-y-4'>
          
          {/* Subtotal */}
          <div className='flex justify-between items-center py-3 px-2 rounded-lg hover:bg-[#2a4447] hover:bg-opacity-30 transition-all duration-200'>
            <span className='text-gray-300 text-base font-medium'>Subtotal</span>
            <span className='text-white text-lg font-semibold tracking-wide'>
              {symbol}{subtotal.toFixed(2)}
            </span>
          </div>

          {/* Divider */}
          <div className='relative'>
            <hr className='border-[#3a5d5d] border-opacity-50' />
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='w-2 h-2 bg-[#518080] rounded-full opacity-50'></div>
            </div>
          </div>

          {/* Shipping Fee */}
          <div className='flex justify-between items-center py-3 px-2 rounded-lg hover:bg-[#2a4447] hover:bg-opacity-30 transition-all duration-200'>
            <span className='text-gray-300 text-base font-medium'>Shipping Fee</span>
            <span className='text-white text-lg font-semibold tracking-wide'>
              {symbol}{shipping.toFixed(2)}
            </span>
          </div>

          {/* Divider */}
          <div className='relative'>
            <hr className='border-[#3a5d5d] border-opacity-50' />
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='w-2 h-2 bg-[#518080] rounded-full opacity-50'></div>
            </div>
          </div>

          {/* Total */}
          <div className='bg-gradient-to-r from-[#518080] to-[#3a5d5d] bg-opacity-20 rounded-xl p-4 mt-2 border-2 border-[#518080] border-opacity-30 shadow-lg'>
            <div className='flex justify-between items-center'>
              <span className='text-white text-lg font-bold tracking-wide'>Total</span>
              <span className='text-[#aaf4e7] text-2xl font-bold tracking-wider drop-shadow-lg'>
                {symbol}{total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Additional Info */}
          {subtotal > 0 && (
            <div className='pt-3'>
              <p className='text-xs text-gray-400 text-center italic'>
                Tax included. Free shipping on orders over {symbol}100
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Security Badge */}
      <div className='mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs'>
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
          <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd' />
        </svg>
        <span>Secure checkout guaranteed</span>
      </div>
    </div>
  )
}

export default CartTotal;