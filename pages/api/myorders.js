
import Order from '../../models/Order';
import connectDb from '../../middlewear/moongose';
import jsonwebtoken from 'jsonwebtoken';
var jwt = require('jsonwebtoken');



const handler = async(req , res)=>{

let token  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsIm5hbWUiOiJXYWxlZWQiLCJpYXQiOjE2NjQ3ODA4NjIsImV4cCI6MTY2NDk1MzY2Mn0.xTEcwAyjP0Iwlw_j1f1S49xSWp13_V5J3NOIpAXh33A"

const decode = jwt.decode(token)
const verify = jwt.verify(token, process.env.JWT_SECRET);
let order = await Order.find({email:verify.email})
// status:'Paid'
 res.status(200).json({order})
}

export default connectDb(handler)

