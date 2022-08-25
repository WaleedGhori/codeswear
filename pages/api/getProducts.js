// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from '../../models/Product';
import connectDb from '../../middlewear/moongose';

let  handler =  async(req , res)=>{
    let products = await Product.find() 
    res.status(200).json({ products})
}
export default connectDb(handler)
  