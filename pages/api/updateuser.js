// Next.js API route support:req.body[i].tilte, https:req.body[i].tilte,//nextjs.
import User from '../../models/User';
import connectDb from '../../middlewear/moongose';
import jsonwebtoken  from 'jsonwebtoken';

let  handler =  async(req , res)=>{

    if (req.method == 'POST') {
        let token = req.body.token;
        let user =  jsonwebtoken.verify(token  ,process.env.JWT_SECRET)
        let dbUser = await User.findOneAndUpdate({email: user.email}, {address:req.body.address , phone:req.body.phone , pincode:req.body.pincode , name:req.body.name} )
        res.status(200).json({success:true})
    }
    else{
    res.status(400).json({error:"Error"})}
  
}
export default connectDb(handler)
  