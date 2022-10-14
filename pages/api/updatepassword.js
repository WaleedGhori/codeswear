// Next.js API route support:req.body[i].tilte, https:req.body[i].tilte,//nextjs.
import User from '../../models/User';
import connectDb from '../../middlewear/moongose';
import jsonwebtoken  from 'jsonwebtoken';
var CryptoJS = require("crypto-js");

let  handler =  async(req , res)=>{

    if (req.method == 'POST') {
        let token = req.body.token;
        let user =  jsonwebtoken.verify(token  ,process.env.JWT_SECRET)
        let dbuser = await User.findOne({email:user.email})
        let bytes  = CryptoJS.AES.decrypt(dbuser.password,process.env.AES_SECRET);
        let decryptPass = bytes.toString(CryptoJS.enc.Utf8);
        if(decryptPass == req.body.password && req.body.npassword == req.body.cpassword){
            let dbUser = await User.findOneAndUpdate({email: user.email},{password:CryptoJS.AES.encrypt(req.body.cpassword, process.env.AES_SECRET).toString()})            
            res.status(200).json({success:true})
            return
        }
        res.status(200).json({success:false})
    }
    else{
    res.status(400).json({error:"Error"})}
  
}
export default connectDb(handler)
  