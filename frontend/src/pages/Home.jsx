import React, { useEffect, useState } from "react";
import Hero from "../component/Hero";
import Background from "../component/Background";
import Product from "./Product";
import OurPolicy from "../component/OurPolicy";
import NewLetterBox from "../component/NewLetterBox";
import Footer from "../component/Footer";

function Home() {
  let heroData = [
    { text1: "30% off limited offer", text2: "Style that" },
    {
      text1: "40% off limited offer on purchace above 1999/-",
      text2: "shop now",
    },
    { text1: "30% off limited offer", text2: "Style that" },
    {
      text1: "40% off limited offer on purchace above 1999/-",
      text2: "shop now",
    },
  ];

  let [heroCount, setHeroCount] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount((prevCount) => (prevCount === 3 ? 0 : prevCount + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="overflow-x-hidden relative ">
      <div className="w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025] mt-18">
        <Background heroCount={heroCount} />
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </div>
      <Product/>
      <OurPolicy/>
      <NewLetterBox/>
      <Footer/>
    </div>
  );
}

export default Home;
