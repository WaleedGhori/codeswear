
import Order from '../../models/Order';
import connectDb from '../../middlewear/moongose';
import jsonwebtoken from 'jsonwebtoken';
var jwt = require('jsonwebtoken');



const handler = async(req , res)=>{

let token  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsIm5hbWUiOiJXYWxlZWQiLCJpYXQiOjE2NjQxNzMxNDUsImV4cCI6MTY2NDM0NTk0NX0._cmS7mSTKtk99uxQwoP_LsXm0qIK21GF3S-2cfGtteU"
const decode = jwt.decode(token)
const verify = jwt.verify(token, process.env.JWT_SECRET);
let order = await Order.find({email:verify.email})
 res.status(200).json({order})
}

export default connectDb(handler)

