const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    tilte:{type: String , required:true},
    slug:{type: String , unique:true ,  required:true},
    desc:{type: String ,  required:true},
    img:{type: String ,  required:true},
    size:{type: String ,  required:true},
    category:{type: String ,  required:true},
    Price:{type: Number,  required:true},
    availableQty:{type: Number,  required:true},
  },{timestamps:true});
mongoose.models = {}
  export default mongoose.model("Product" , ProductSchema)