
import Order from '../../models/Order';
import connectDb from '../../middlewear/moongose';
import jsonwebtoken from 'jsonwebtoken';
var jwt = require('jsonwebtoken');



const handler = async(req , res)=>{

let token  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsIm5hbWUiOiJXYWxlZWQiLCJpYXQiOjE2NjQ0MzU5NzksImV4cCI6MTY2NDYwODc3OX0.m60hmB7S2brECvk-GLK0LWiRo_YH8SfJ4xaOPxJTVv4"
const decode = jwt.decode(token)
const verify = jwt.verify(token, process.env.JWT_SECRET);
let order = await Order.find({email:verify.email})
// status:'Paid'
 res.status(200).json({order})
}

export default connectDb(handler)

