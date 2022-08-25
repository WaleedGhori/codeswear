// Next.js API route support:req.body[i].tilte, https:req.body[i].tilte,//nextjs.
import Product from '../../models/Product';
import connectDb from '../../middlewear/moongose';

let  handler =  async(req , res)=>{

    if (req.method == 'POST') {
        console.log(req.body);
        for(let i = 0; i<req.body.length; i++){
            let p = await Product.findByIdAndUpdate(req.body[i]._id , req.body[i])
        }
        res.status(200).json({success:"The item is successfully placed"})
    }
    else{
    res.status(400).json({error:"This Method is not allowed"})}
  
}
export default connectDb(handler)
  