const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userid:{type: String , required:true},
    email:{type: String , unique:true ,  required:true},
    token:{type: String ,  required:true},
  },{timestamps:true});
  mongoose.models = {}
  export default mongoose.model("User" , UserSchema)