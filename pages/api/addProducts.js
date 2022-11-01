// Next.js API route support:req.body[i].tilte, https:req.body[i].tilte,//nextjs.
import Product from '../../models/Product';
import connectDb from '../../middlewear/moongose';

let  handler =  async(req , res)=>{

    if (req.method == 'POST') {    
        console.log(req.body.length);
        for(let i = 0; i<req.body.length; i++){
            console.log(req.body.length);
            let p = new Product({
                title:req.body[i].title,
                slug:req.body[i].slug, 
                desc:req.body[i].desc,
                img:req.body[i].img,
                color:req.body[i].color,
                size:req.body[i].size,
                category:req.body[i].category,
                price:req.body[i].price,
                availableQty:req.body[i].availableQty,
            })
            await p.save();
            
        }
        res.status(200).json({success:"The item is successfully placed"})
    }
    else{
    res.status(400).json({error:"This Method is not allowed fsdfehfd cfdgdfds"})}
  
}
export default connectDb(handler)
  