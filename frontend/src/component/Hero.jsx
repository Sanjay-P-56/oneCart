import React from "react";
import { GoDotFill } from "react-icons/go";

function Hero({ heroData, heroCount, setHeroCount }) {
  return (
    <div className="w-[40%] h-[100%] relative">
      <div className="absolute text-white text-[20px] md:text-[40px] lg:text-[55px] md:left-[10%] md:top-[90px] lg:top-[130px] left-[10%] top-[10%] ml-15">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>
      <div className="absolute md:left-[10%] md:top-[400px] lg:top-[500px] left-[10%] top-[160px] flex items-center justify-center gap-[10px] ml-15">
      <GoDotFill className={` w-[14px] ${heroCount===0?"fill-orange-400":"fill-white"}`} onClick={()=>
        setHeroCount(0)
      }/>
      <GoDotFill className={` w-[14px] ${heroCount===1?"fill-orange-400":"fill-white"}`} onClick={()=>
        setHeroCount(1)
      }/>
      <GoDotFill className={` w-[14px] ${heroCount===2?"fill-orange-400":"fill-white"}`} onClick={()=>
        setHeroCount(2)
      }/>
      <GoDotFill className={` w-[14px] ${heroCount===3?"fill-orange-400":"fill-white"}`} onClick={()=>
        setHeroCount(3)
      }/>
      </div>
    </div>
  );
}

export default Hero;
