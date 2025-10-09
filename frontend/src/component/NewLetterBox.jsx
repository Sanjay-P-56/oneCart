import React from "react";

function NewLetterBox() {
  const handleSubmit=()=>{
    e.preventDefault()
  }
  return (
    <div className="w-[100vw] h-[40vh]  bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col gap-[10px]">
      <p className="md:text-[30px] text-[20px] text-[#a5faf7] font-semibold px-[20px]">
        Subscribe now & get 20% off
      </p>
      <p className="md:text-[18px] text-[14px] text-center text-blue-100 font-semibold px-[20px]">
        Subscribe now and enjoy exclusive savings, special deals, and early
        access to new collections.
      </p>
      <form
      onSubmit={handleSubmit}
        action=""
        className="w-[100%] h-[30%] md:h-[50%] flex items-center justify-center mt-[20px] gap-[20px] px-[20px] "
      >
        <input
          type="text"
          placeholder="Enter Your Email"
          required
          className="placeholder:text-black bg-slate-300 w-[600px] max-w-[60%] h-[40px] px-[20px] rounded-lg shadow-sm shadow-black "
        />
        <button className="text-[15px] md:text-[16px] text-white bg-gray-800 hover:bg-slate-600 rounded-lg p-2 cursor-pointer gap-[20px]">Subscribe</button>
      </form>
    </div>
  );
}

export default NewLetterBox;
