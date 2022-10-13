// Next.js API route support:req.body[i].tilte, https:req.body[i].tilte,//nextjs.
import User from '../../models/User';
import connectDb from '../../middlewear/moongose';
import jsonwebtoken  from 'jsonwebtoken';

let  handler =  async(req , res)=>{

    if (req.method == 'POST') {
        let token = req.body.token;
        let user =  jsonwebtoken.verify(token  ,process.env.JWT_SECRET)
        let dbUser = await User.findOne({email: user.email})
        const {email , name , address , pincode , phone} = dbUser
        res.status(200).json({email , name , address , pincode , phone})
    }
    else{
    res.status(400).json({error:"Error"})}
  
}
export default connectDb(handler)
  