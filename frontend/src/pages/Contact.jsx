import React from 'react'
import Title from '../component/Title'
import contact from '../assets/contact.png'
import NewLetterBox from '../component/NewLetterBox'
function Contact() {
  return (
    <div className='w-full min-h-screen overflow-x-hidden bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col gap-12 pt-20'>
      <Title text1={"CONTACT "} text2={"US"}/>
      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
          <img src={contact} alt="" className='lg:w-[70%] w-[80%] h-[450px] shadow-md shadow-black rounded-sm' />
        </div>

        <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]'>
          <p className='lg:w-[80%] w-[100%] text-white lg:text-[18px] text-[15px] mt-[10px] font-bold'>
            Our Store
          </p>
          <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
            <p>1234 Random Station</p>
            <p>Mysuru city , Karnataka , India</p>
          </p>

          <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
            <p>tel: +91-1234567890</p>
            <p>Email: admin@onecart.com</p>
          </p>

          <p className='lg:w-[80%] w-[100%] text-white lg:text-[18px] text-[15px] mt-[10px] font-bold'>
            Careers at OneCart
          </p>
          <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
            Learn more about our teams and job openings
          </p>

          <button className='text-[15px] md:text-[16px] text-white bg-gray-800 hover:bg-slate-600 rounded-lg p-2 cursor-pointer gap-[20px]'>Explore More</button>
        </div>
      </div>
      <NewLetterBox/>
    </div>
  )
}

export default Contact