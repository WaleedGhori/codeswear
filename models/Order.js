const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
   email:{type:String , required:true},
   products:[{
    productId:{type:String},
    quantity:{type:Number , default:1}
   }],
   address:{type:String ,required:true},
   ammount:{type:Number, required:true},
   status:{type:String , default:'Pending' , required:true},
  },{timestamps:true});
//   mongoose.models = {}
  export default mongoose.model.Order || mongoose.model("Order" , OrderSchema)