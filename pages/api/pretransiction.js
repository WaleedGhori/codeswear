const https = require('https');
const Paytm = require('paytmchecksum');
import Order from '../../models/Order';
import connectDb from '../../middlewear/moongose';
import Product from '../../models/Product';
// const PaytmChecksum = require('./PaytmChecksum');
let handler = async (req, res) => {

if(req.method =="POST"){
    // check the cart is remperd or not --[Pending]
    let product , sumTotal=0;
    let cart = req.body.cart
    
    if(req.body.subtotal <= 0){
        res.status(200).json({success:false ,"error":"Cart Empty! PLease build your cart and try again later!"})
        return
    }
    for(let item in cart){
        sumTotal += cart[item].price * cart[item].qty 
        product = await Product.findOne({slug:item})
        if(product.availableQty < cart[item].qty){
            // console.log("Yes qty not available1",product.availableQty , cart[item].qty );
            res.status(200).json({success:false ,"error":"Some item of your cart went out of stock please try again!"})
            return
        }
        if(product.price !=cart[item].price){
            res.status(200).json({success:false ,"error":"The price of some item have changed. Please try again"})
            return
        }
    }
    if(sumTotal !== req.body.subtotal){
        res.status(200).json({success:false ,"error":"The price of some item have changed. Please try again"})
        return
    }
    // check if the cart item is not out of stock --[Pending]
    if (req.body.phone.length !== 10 || !Number.isInteger(Number(req.body.phone)) ) {
        res.status(200).json({success:false ,"error":"Please enter valid phone number"})
        return
    }
    if (req.body.pincode.length !== 5 || !Number.isInteger(Number(req.body.pincode)) ) {
        res.status(200).json({success:false ,"error":"Please enter valid pincode number"})
        return
    }
    // check if the cart item are valid --[Pending]
    let order  = Order({
        email:req.body.email,
        orderId:req.body.oid,
        address:req.body.address,
        ammount:req.body.subtotal,
        products:req.body.cart,
    })
    await order.save();
    res.send({ success: 'true' });

//     var paytmParams = {}
// paytmParams.body = {
//     "requestType"   : "Payment",
//     "mid"           : process.env.NEXT_PUBLIC_PAYTM_MID,
//     "websiteName"   : "YOUR_WEBSITE_NAME",
//     "orderId"       : req.body.oid,
//     "callbackUrl"   : `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
//     "txnAmount"     : {
//         "value"     : req.body.subtotal,
//         "currency"  : "INR",
//     },
//     "userInfo"      : {
//         "custId"    : req.body.email,
//     },
// };

// /*
// * Generate checksum by parameters we have in body
// * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
// */
// let checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.NEXT_PUBLIC_PAYTM_MID)

//     paytmParams.head = {
//         "signature"    : checksum
//     };

//     var post_data = JSON.stringify(paytmParams);
//     const requestAsync =async()=>{
//     return new Promise((resolve , reject) =>{
//         var options = {

//             /* for Staging */
//             // hostname: 'securegw-stage.paytm.in',
    
//             /* for Production */
//             hostname: 'securegw.paytm.in',
    
//             port: 443,
//             path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}}&orderId=${req.body.oid}`,
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Content-Length': post_data.length
//             }
//         };
    
//         var response = "";
//         var post_req = https.request(options, function(post_res) {
//             post_res.on('data', function (chunk) {
//                 response += chunk;
//             });
    
//             post_res.on('end', function(){
//                 // console.log('Response: ', response);
                    // Response.success = true
//                 resolve(JSON.parse(response).body)
//             });
//         });
    
//         post_req.write(post_data);
//         post_req.end();

//         })
//     }
//     let myr = await requestAsync();
//     res.status(200).json(myr)
  
}}

export default connectDb(handler)