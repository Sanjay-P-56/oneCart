import React from "react";
import bimag1 from '../assets/bimg1.png'
import bimg3 from '../assets/bimg3.png'
import bimg2 from '../assets/bimg2.png'
import bimg4 from '../assets/bimg4.png'
function Background({ heroCount }) {
  if (heroCount === 0) {
    return (
      <img
        src={bimag1}
        alt=""
        className="w-[100%] h-[100%] float-left overflow-auto object-cover rounded-[120px] rounded-tl-[200px] rounded-br-[200px] p-12"
      />
    );
  } else if (heroCount === 1) {
    return (
      <img
        src={bimg3}
        alt=""
        className="w-[100%] h-[100%] float-left overflow-auto object-cover rounded-[120px] rounded-tl-[200px] rounded-br-[200px] p-12"
      />
    );
  } else if (heroCount === 2) {
    return (
      <img
        src={bimg4}
        alt=""
        className="w-[100%] h-[100%] float-left overflow-auto object-cover rounded-[120px] rounded-tl-[200px] rounded-br-[200px] p-12"
      />
    );
  } else if (heroCount === 3) {
    return (
      <img
        src={bimg2}
        alt=""
        className="w-[100%] h-[100%] float-left overflow-auto object-cover rounded-[120px] rounded-tl-[200px] rounded-br-[200px] p-12"
      />
    );
  }
}

export default Background;
