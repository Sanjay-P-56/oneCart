import React from "react";
import Title from "../component/Title";
import { useState } from "react";
import CartTotal from "../component/CartTotal";
import razorpay from "../assets/razorpay.png";
import { data, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

function PlaceOrder() {
  let navigate = useNavigate();
  let [method, setMethod] = useState("cod");
  let { serverUrl } = useContext(authDataContext);
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } =
    useContext(ShopDataContext);

  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // your Razorpay test key
    amount: order.amount,
    currency: order.currency,
    name: 'Order Payment',
    description: 'Order payment through Razorpay',
    order_id: order.id,
    receipt: order.receipt,
    payment:order.payment,
    handler: async (response) => {
      console.log("Payment success:", response);
      // You can call your backend here to verify payment
    },
    theme: {
      color: "#3399cc",
    },
  };

  // ✅ This must be OUTSIDE the options object
  const rzp = new window.Razorpay(options);
  rzp.open();
};


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const result = await axios.post(
            serverUrl + "/api/order/placeorder",
            orderData,
            { withCredentials: true }
          );
          console.log(result.data);
          if (result.data) {
            setCartItem({});
            navigate("/order");
          } else {
            console.log(result.data.message);
          }
          break;

        case "razorpay":
          const resultRazorpay=await axios.post(serverUrl+'/api/order/razorpay',orderData,{withCredentials:true})
          if(resultRazorpay.data){
            initPay(resultRazorpay.data)
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start  gap-12 pt-20 lg:flex-row flex-col relative">
      <div className="lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px] ">
        {/* form */}

        <form
          action=""
          className="lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]"
          onSubmit={onSubmitHandler}
        >
          <div className="py-[10px] text-center">
            <Title text1={"DELIVERY "} text2={"INFORMATION"} />
          </div>

          {/* name */}
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px] ">
            <input
              type="text"
              placeholder="First Name"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px] shadow-gray-800 placeholder:opacity-[0.5]"
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
            />

            <input
              type="text"
              placeholder="Last Name"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px] shadow-gray-800 placeholder:opacity-[0.5]"
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
            />
          </div>

          {/* email */}
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px] ">
            <input
              type="email"
              placeholder="Email address"
              className="w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px] shadow-gray-800 placeholder:opacity-[0.5]"
              required
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
            />
          </div>

          {/* street */}
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px] ">
            <input
              type="text"
              placeholder="Street"
              className="w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px] shadow-gray-800 placeholder:opacity-[0.5]"
              required
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
            />
          </div>

          {/* city, state */}
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px] ">
            <input
              type="text"
              placeholder="City"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px] shadow-gray-800 placeholder:opacity-[0.5]"
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
            />

            <input
              type="text"
              placeholder="State"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px] shadow-gray-800 placeholder:opacity-[0.5]"
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
            />
          </div>

          {/* pincode, country */}
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px] ">
            <input
              type="text"
              placeholder="Pincode"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px] shadow-gray-800 placeholder:opacity-[0.5]"
              required
              onChange={onChangeHandler}
              name="pinCode"
              value={formData.pinCode}
            />

            <input
              type="text"
              placeholder="Country"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px] shadow-gray-800 placeholder:opacity-[0.5]"
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
            />
          </div>

          {/* phone */}
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px] ">
            <input
              type="text"
              placeholder="Phone"
              className="w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-white text-[18px] px-[20px] shadow-gray-800 placeholder:opacity-[0.5]"
              required
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
            />
          </div>

          {/* button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="mt-4 w-[48%] py-4 text-white text-lg font-bold rounded-xl shadow-lg transition-all duration-300 bg-green-900 hover:bg-green-600"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>

      {/* payment method  */}
      <div className="lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px] ">
        <div className="lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center justify-center gap-[10px] flex-col  ">
          <CartTotal />
          <div className="py-[10px]">
            <Title text1={"PAYMENT "} text2={"METHOD"} />
          </div>

          <div
            className={
              "w-[100%] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center gap-[50px]"
            }
          >
            <button
              onClick={() => setMethod("razorpay")}
              className={`w-[150px] h-[50px]  rounded-sm ${
                method === "razorpay"
                  ? "border-[5px] border-blue-900 rounded-sm"
                  : ""
              }`}
            >
              <img
                src={razorpay}
                className=" w-[100%] h-[100%] object-fill rounded-sm"
              />
            </button>

            <button
              onClick={() => setMethod("cod")}
              className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${
                method === "cod"
                  ? "border-[5px] border-blue-900 rounded-sm"
                  : ""
              }`}
            >
              CASH ON DELIVERY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
