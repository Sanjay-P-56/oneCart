import React from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import uploadimg from "../assets/uploadImage.png";
import { useState } from "react";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from 'axios'
import { toast } from "react-toastify";
import Loading from "../component/Loading";

function Add() {
  let [image1, setImage1] = useState(false);
  let [image2, setImage2] = useState(false);
  let [image3, setImage3] = useState(false);
  let [image4, setImage4] = useState(false);
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState("Men");
  let [price, setPrice] = useState("");
  let [subCategory, setSubCategory] = useState("TopWear");
  let [bestseller, setBestseller] = useState(false);
  let [sizes, setSizes] = useState([]);
  const [loading,setLoading]=useState(false)
  let {serverUrl} =useContext(authDataContext)

  const handleAddProduct = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      let formData=new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))
      formData.append("image1",image1)
      formData.append("image2",image2)
      formData.append("image3",image3)
      formData.append("image4",image4)

      let result=await axios.post(serverUrl+"/api/product/addproduct",formData,{withCredentials:true})
    console.log(result.data)
    toast.success("Product added Successfully")
    setLoading(false)

    if(result.data){
      setName("")
      setDescription("")
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)
      setPrice("")
      setBestseller(false)
      setCategory("Men")
      setSubCategory("TopWear")
      setSizes([])
    }
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Failed to add product")
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0c2025] via-[#141414] to-[#0f1419] text-white overflow-x-hidden relative">
      <Nav />
      <Sidebar />

      <div className="w-full lg:w-[calc(100%-310px)] lg:ml-[310px] min-h-screen flex items-start justify-center pt-[70px] px-4 md:px-8">
        <form
          onSubmit={handleAddProduct}
          className="w-full max-w-[1400px] mt-8 mb-12  backdrop-blur-sm rounded-3xl border border-slate-700/50 shadow-2xl p-6 md:p-10"
        >
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
              Add New Product
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
          </div>

          {/* Upload Images Section */}
          <div className="mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-2xl">📸</span>
              Upload Product Images
            </h2>
            <div className="flex flex-wrap items-center justify-start gap-4 md:gap-6">
              {[
                { id: "image1", state: image1, setState: setImage1 },
                { id: "image2", state: image2, setState: setImage2 },
                { id: "image3", state: image3, setState: setImage3 },
                { id: "image4", state: image4, setState: setImage4 }
              ].map((img, idx) => (
                <label
                  key={img.id}
                  htmlFor={img.id}
                  className="group relative w-24 h-24 md:w-32 md:h-32 cursor-pointer"
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-dashed border-slate-600 hover:border-cyan-400 transition-all duration-300 bg-slate-800/50 group-hover:bg-slate-700/50 shadow-lg group-hover:shadow-cyan-500/20 group-hover:scale-105 transform">
                    <img
                      src={!img.state ? uploadimg : URL.createObjectURL(img.state)}
                      alt={`upload ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {idx + 1}
                  </div>
                  <input
                    type="file"
                    id={img.id}
                    hidden
                    onChange={(e) => img.setState(e.target.files[0])}
                    required
                  />
                </label>
              ))}
            </div>
            <p className="text-slate-400 text-sm mt-4 flex items-center gap-2">
              <span>💡</span>
              Upload 4 high-quality images for best results
            </p>
          </div>

          {/* Product Name */}
          <div className="mb-8">
            <label className="block text-xl md:text-2xl font-bold text-white mb-4">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name..."
              className="w-full max-w-2xl h-12 md:h-14 rounded-xl bg-slate-800/60 border-2 border-slate-600 hover:border-cyan-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200 px-5 text-base md:text-lg text-white placeholder:text-slate-400 outline-none"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          {/* Product Description */}
          <div className="mb-8">
            <label className="block text-xl md:text-2xl font-bold text-white mb-4">
              Product Description
            </label>
            <textarea
              placeholder="Describe your product in detail..."
              className="w-full max-w-2xl h-32 rounded-xl bg-slate-800/60 border-2 border-slate-600 hover:border-cyan-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200 px-5 py-4 text-base md:text-lg text-white placeholder:text-slate-400 outline-none resize-none"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>

          {/* Category and Sub-Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
            {/* Product Category */}
            <div>
              <label className="block text-xl md:text-2xl font-bold text-white mb-4">
                Product Category
              </label>
              <select
                className="w-full max-w-md h-12 md:h-14 bg-slate-800/60 border-2 border-slate-600 hover:border-cyan-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/50 rounded-xl px-4 text-base md:text-lg text-white outline-none cursor-pointer transition-all duration-200 appearance-none"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2306b6d4'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '3rem'
                }}
              >
                <option value="Men">👔 Men</option>
                <option value="Women">👗 Women</option>
                <option value="Kids">👶 Kids</option>
              </select>
            </div>

            {/* Sub Category */}
            <div>
              <label className="block text-xl md:text-2xl font-bold text-white mb-4">
                Product Sub-Category
              </label>
              <select
                className="w-full max-w-md h-12 md:h-14 bg-slate-800/60 border-2 border-slate-600 hover:border-cyan-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/50 rounded-xl px-4 text-base md:text-lg text-white outline-none cursor-pointer transition-all duration-200 appearance-none"
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2306b6d4'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '3rem'
                }}
              >
                <option value="TopWear">👕 TopWear</option>
                <option value="BottomWear">👖 BottomWear</option>
                <option value="WinterWear">🧥 WinterWear</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="mb-8">
            <label className="block text-xl md:text-2xl font-bold text-white mb-4">
              Product Price
            </label>
            <div className="relative w-full max-w-2xl">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl md:text-2xl text-cyan-400 font-bold">₹</span>
              <input
                type="number"
                placeholder="2000"
                className="w-full h-12 md:h-14 rounded-xl bg-slate-800/60 border-2 border-slate-600 hover:border-cyan-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200 pl-12 pr-5 text-base md:text-lg text-white placeholder:text-slate-400 outline-none"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-8">
            <label className="block text-xl md:text-2xl font-bold text-white mb-4">
              Available Sizes
            </label>
            <div className="flex items-center justify-start gap-3 md:gap-4 flex-wrap">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-bold border-2 transition-all duration-300 transform hover:scale-105 ${
                    sizes.includes(size)
                      ? "bg-gradient-to-br from-cyan-400 to-blue-500 text-white border-cyan-400 shadow-lg shadow-cyan-500/50"
                      : "bg-slate-800/60 text-slate-300 border-slate-600 hover:border-cyan-400 hover:text-white"
                  }`}
                  onClick={() => {
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((item) => item !== size)
                        : [...prev, size]
                    );
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="text-slate-400 text-sm mt-4 flex items-center gap-2">
              <span>💡</span>
              Click to select/deselect sizes
            </p>
          </div>

          {/* Bestseller Checkbox */}
          <div className="mb-10">
            <label
              htmlFor="checkbox"
              className="flex items-center gap-4 cursor-pointer group w-fit"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="peer w-7 h-7 cursor-pointer appearance-none rounded-lg border-2 border-slate-600 bg-slate-800/60 checked:bg-gradient-to-br checked:from-cyan-400 checked:to-blue-500 checked:border-cyan-400 transition-all duration-300"
                  checked={bestseller}
                  onChange={() => setBestseller((prev) => !prev)}
                />
                <svg
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2">
                <span>⭐</span>
                Add to Bestseller
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="min-w-[180px] px-8 py-4 md:py-5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white text-base md:text-lg font-bold shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loading />
                <span>Adding Product...</span>
              </>
            ) : (
              <>
                <span className="text-xl">✨</span>
                <span>Add Product</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;