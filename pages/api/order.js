import React from 'react'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from '../../models/Order';
import connectDb from '../../middlewear/moongose';

let  handler =  async(req , res)=>{
 let order = await Order.find() 
 res.status(200).json({order})
}

export default connectDb(handler)

