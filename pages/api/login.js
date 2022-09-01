import User from "../../models/User";
import connectDb from "../../middlewear/moongose";
var CryptoJS = require("crypto-js");

let handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    let user =await User.findOne({ "email": req.body.email });
    let bytes  = CryptoJS.AES.decrypt(user.password, 'secret123');
    let decryptPass = bytes.toString(CryptoJS.enc.Utf8);
    if (user) {
      if (req.body.email == user.email && req.body.password == decryptPass) {
        res.status(200).json({ success:true, email:user.email, name:user.name });
    }
    else{
        res.status(200).json({ success:false , error:"Invalid Credentials"});
        }
    }
    else{
        res.status(200).json({success:false  ,error:"Not user Found"})
    }
  } 
  else {
    res.status(400).json({ error: "This Method is not allowed" });
  }
};
export default connectDb(handler);
