import Order from "../model/orderModel.js";
import User from '../model/userModel.js';
import razorpay from 'razorpay'
import dotenv from 'dotenv'
dotenv.config(0)

const currency='inr'
const razorpayInstance = new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET,
});

export const placeOrder=async(req,res)=>{

  try {
    const{items,amount,address}=req.body;
    const userId=req.userId;
    const orderData={
      items,
      amount,
      userId,
      address,
      paymentMethod:'COD',
      payment:false,
      date:Date.now()
    }

    const newOrder=new Order(orderData);
    await newOrder.save()

    await User.findByIdAndUpdate(userId,{cartData:{}})

    return res.status(201).json({message:'Order Placed'})

  } catch (error) {
     console.log(error);
    return res.status(500).json({message:"order place error"});
  }
}

export const placeOrderRazorpay=async(req,res)=>{
  try {
    const {items,amount,address}=req.body;
    const userId=req.userId;

    const orderData={
      items,
      amount,
      userId,
      address,
      paymentMethod:'RazorPay',
      payment:true,
      date:Date.now()
    }

    const newOrder=new Order(orderData)
    await newOrder.save()

    const options={
      amount:amount*100,
      currency:currency.toUpperCase(),
      receipt:newOrder._id.toString()
    }

    await razorpayInstance.orders.create(options,(error,order)=>{
      if(error){
        console.log(error)
        return res.status(500).json(error)
      }
      res.status(200).json(order)
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:error.message});
  }
}

export const userOrders=async(req,res)=>{
  try {
    const userId=req.userId;
    const orders=await Order.find({userId})
    return res.status(200).json(orders)

  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"userOrder error"});
  }
}



// for admin

export const allOrders=async(req,res)=>{
  try {
    const orders=await Order.find({})
    return res.status(200).json(orders)

  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"adminAllOrders error"});
  }
}

export const updateStatus=async(req,res)=>{
  try {
    const {orderId,status}=req.body;

    await Order.findByIdAndUpdate(orderId,{status})
     return res.status(200).json({message:'status updated'})

  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"updateStatus error"});
  }
}