// Next.js API route support:req.body[i].tilte, https:req.body[i].tilte,//nextjs.
import User from '../../models/User';
import connectDb from '../../middlewear/moongose';
var CryptoJS = require("crypto-js");


let handler = async (req, res) => {
    if (req.method == 'POST') {
        console.log(req.body);
        const{name , email} = req.body
        let u = new User({name , email , password:CryptoJS.AES.encrypt(req.body.password, 'secret123').toString()});
        await u.save()
        res.status(200).json({ success: "Sign Up Successfully" })
    }
    else {
        res.status(400).json({ error: "This Method is not allowed" })    
    }

}
export default connectDb(handler)
