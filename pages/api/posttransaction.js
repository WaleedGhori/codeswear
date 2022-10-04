// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from '../../models/Order';
import connectDb from '../../middlewear/moongose';
import Product from '../../models/Product';
import paytmchecksum from 'paytmchecksum'
let handler = async (req, res) => {
  let order;
  //validate the cheksum 
  var paytmchecksum = ''; 

  var paytmParams  = {}
  
  const received_data = req.body
    
  for (var key in received_data) {
      if (key == 'CHECKSUMCASH') {
        paytmchecksum= received_data[key];
      }
      else{
          paytmParams[key] = received_data[key]
      }        
  }
  
  var isValidChecksum = paytmchecksum.verifySignature(paytmParams , process.env.local ,paytmchecksum)
  if (!isValidChecksum) {
    res.status(500).send("Some error occurred")
    return
  }
 

  //update status into Order tables after checking the transaction status
  if (req.bod.STATUS =="TXN_SUCCESS") {
    await  Order.findOneAndUpdate({orderId: req.body.ORDERID}, {status:"Paid", paymentInfo:JSON.stringify(req.body)} )   
    let products = order.products
    for(let slug in products){
      await Product.findOneAndUpdate({slug, slug}, {$inc:{"availableQty":-products[slug].qty}})
    }
  }
  else if (req.body.STATUS == "PENDING") {
    await  Order.findOneAndUpdate({orderId: req.body.ORDERID}, {status:"Pending", paymentInfo:JSON.stringify(req.body)} )
  }
 
    // res.status(200).json({ body:req.body })
    res.redirect('/order?clearCart=1&id='+order_id, 200)
  }

  export default connectDb(handler)
  