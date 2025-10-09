import React, { useContext, useEffect, useState } from "react";
import { FaAngleRight, FaChevronDown } from "react-icons/fa6";
import Title from "../component/Title";
import { ShopDataContext } from "../context/ShopContext";
import Card from "../component/Card";
import { ImTab } from "react-icons/im";

function Collections() {
  const [showFilter, setShowFilter] = useState(false);
  let { products, search, showSearch } = useContext(ShopDataContext);
  let [filterProduct, setFilterProduct] = useState([]);
  let [category, setCategory] = useState([]);
  let [subCategory, setSubCategory] = useState([]);
  let [sortType, setSortType] = useState("relevent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();
    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProduct(productCopy);
  };

  const sortProducts = (e) => {
    let fbCopy = filterProduct.slice();
    switch (sortType) {
      case "low-high":
        setFilterProduct(fbCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProduct(fbCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
    }
  };

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row pt-20 overflow-x-hidden">
      {/* Sidebar */}
      <div
        className={`md:w-80 lg:w-72 w-full md:min-h-screen p-5 transition-all duration-300 ease-in-out ${
          showFilter ? "h-auto" : "h-auto md:h-screen"
        } border-r border-cyan-500/20 md:fixed lg:fixed z-[5]`}
      >
        {/* Filter Toggle */}
        <button
          className="w-full text-left text-2xl font-bold flex gap-2 items-center justify-between cursor-pointer text-cyan-400 hover:text-cyan-300 transition-colors duration-200 mb-6 md:cursor-default"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <span className="tracking-wide">FILTERS</span>
          <div className="md:hidden">
            {!showFilter ? (
              <FaAngleRight className="text-lg" />
            ) : (
              <FaChevronDown className="text-lg" />
            )}
          </div>
        </button>

        <div className={`space-y-6 ${showFilter ? "block" : "hidden md:block"}`}>
          {/* Categories */}
          <div className="border border-cyan-500/30 rounded-lg p-5 bg-slate-800/60 backdrop-blur-md shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:border-cyan-500/50">
            <p className="text-lg font-semibold text-cyan-300 mb-4 tracking-wide">
              CATEGORIES
            </p>
            <div className="space-y-3">
              {["Men", "Women", "Kids"].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 text-base font-light text-slate-200 cursor-pointer hover:text-cyan-300 transition-colors duration-200 group"
                >
                  <input
                    type="checkbox"
                    value={cat}
                    className="w-4 h-4 rounded border-cyan-500/50 bg-slate-700 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer transition-all"
                    onChange={toggleCategory}
                  />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Sub-Categories */}
          <div className="border border-cyan-500/30 rounded-lg p-5 bg-slate-800/60 backdrop-blur-md shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:border-cyan-500/50">
            <p className="text-lg font-semibold text-cyan-300 mb-4 tracking-wide">
              SUB-CATEGORIES
            </p>
            <div className="space-y-3">
              {["TopWear", "BottomWear", "WinterWear"].map((subCat) => (
                <label
                  key={subCat}
                  className="flex items-center gap-3 text-base font-light text-slate-200 cursor-pointer hover:text-cyan-300 transition-colors duration-200 group"
                >
                  <input
                    type="checkbox"
                    value={subCat}
                    className="w-4 h-4 rounded border-cyan-500/50 bg-slate-700 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer transition-all"
                    onChange={toggleSubCategory}
                  />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {subCat}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:ml-80 lg:ml-72">
        <div className="w-full p-5 lg:px-12 flex justify-between items-center flex-col lg:flex-row gap-4 lg:gap-0  backdrop-blur-sm border-b border-cyan-500/20">
          <Title text1={"ALL "} text2={"COLLECTIONS"} />

          <select
            name=""
            id=""
            className="bg-slate-800/80 w-full md:w-56 h-12 px-4 text-cyan-100 rounded-lg border-2 border-cyan-500/30 hover:border-cyan-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 cursor-pointer shadow-md hover:shadow-cyan-500/20"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevent" className="bg-slate-800 text-cyan-100">
              Sort By: Relevant
            </option>
            <option value="low-high" className="bg-slate-800 text-cyan-100">
              Sort By: Low to High
            </option>
            <option value="high-low" className="bg-slate-800 text-cyan-100">
              Sort By: High to Low
            </option>
          </select>
        </div>

        <div className="w-full min-h-screen p-6 lg:p-12 flex items-start justify-center flex-wrap gap-8">
          {filterProduct.length > 0 ? (
            filterProduct.map((item, index) => (
              <div
                key={item._id}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <Card
                  id={item._id}
                  price={item.price}
                  image={item.image1}
                  name={item.name}
                />
              </div>
            ))
          ) : (
            <div className="w-full h-64 flex items-center justify-center">
              <p className="text-cyan-300 text-xl font-light">
                No products found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collections;