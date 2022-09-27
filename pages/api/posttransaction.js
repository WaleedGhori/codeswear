// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from '../../models/Order';
import connectDb from '../../middlewear/moongose';

let handler = async (req, res) => {
  //validate the cheksum 
  //update status into Order tables after checking the transaction status
  if (req.bod.STATUS =="TXN_SUCCESS") {
    await  Order.findOneAndUpdate({orderId: req.body.ORDERID}, {status:"Paid", paymentInfo:JSON.stringify(req.body)} )   
  }
  else if (req.body.STATUS == "PENDING") {
    await  Order.findOneAndUpdate({orderId: req.body.ORDERID}, {status:"Pending", paymentInfo:JSON.stringify(req.body)} )
  }
 
    // res.status(200).json({ body:req.body })
    res.redirect('/order?id'+order_id, 200)
  }

  export default connectDb(handler)
  