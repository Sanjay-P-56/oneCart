import React, { useContext } from 'react';
import ai from '../assets/ai.png';
import { ShopDataContext } from '../context/ShopContext';
import {useNavigate} from 'react-router-dom'
import sound from '../assets/click.wav'

function Ai() {

  let {showSearch,setShowSearch}=useContext(ShopDataContext)
  let navigate=useNavigate()
  let audio=new Audio(sound)

  function speak(message){
    let utterence=new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterence)
  }

  const speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition=new speechRecognition()

  if(!recognition){
    console.log("not supported")
  }
  recognition.onresult=(e)=>{
    const transcript=e.results[0][0].transcript.trim().toLowerCase();   
      // ====show search ===== 
        if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
        speak("Opening search");
        setShowSearch(true);
        navigate("/collections");
       
      // ==== close search ==== 
      } else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
        speak("Closing search");
        setShowSearch(false);

      // ===== COLLECTION COMMAND =====
      } else if (transcript.includes("open") && transcript.includes("collection")||transcript.includes("collections")||transcript.includes("products")||transcript.includes("product")) {
        speak("Opening collection page");
        navigate("/collections");

      // ===== ORDERS COMMAND =====
      } else if (transcript.includes("open") && transcript.includes("orders") || transcript.includes("order")) {
        speak("Opening orders page");
        navigate("/order");

      // ===== CART COMMAND =====
      } else if (transcript.includes("open") && transcript.includes("cart")||transcript.includes("carts")) {
        speak("Opening cart page");
        navigate("/cart");

      // ==== about page =====
      } else if (transcript.includes("open") && transcript.includes("about") ||transcript.includes("aboutpage")) {
        speak("Opening about page");
        navigate("/about");

      }else if (transcript.includes("open") && transcript.includes("home") ||transcript.includes("homepage")) {
        speak("Opening home page");
        navigate("/");

      } else {
        speak("Sorry, command not recognized");
       
      }

  }
  return (
    <div className="fixed bottom-[20px] left-[1%] z-50">
      <div
        className="w-[90px] h-[90px] cursor-pointer rounded-full overflow-hidden transition-transform duration-300 hover:scale-125"
        onClick={()=>{recognition.start();
          audio.play();
        }}
      >
        <img
          src={ai}
          alt="AI"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  );
}

export default Ai;
