// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Forgot from '../../models/Forgot'
import User from '../../models/User'
export default function handler(req, res) {
    if(req.body.sendMail){ 
    let token = 'sdsvxrevwdfew'
    let forgot = new Forgot({
        email:req.body.email,
        token : token   
    })
    let email = `We have sent you this email in response to your request to reset your password on Codeswear.

   <br/><br/>

   To reset your password. PLease follow the link below
    <a href="http://codeswear.com/forgot?token=${token}"</a>, please follow the link below:

   <a href="${reset - password - url}">${reset - password - url}</a>

   <br/><br/>

   We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your Codeswear.com My Account Page and change your  password.

   <br/><br/>`
}
else{
    // reset the user password
}

   res.status(200).json({success:true})
}
