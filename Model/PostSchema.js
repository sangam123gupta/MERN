const mongoose=require('mongoose');

const required=true;

const userSchema=mongoose.Schema({

   title:{type:String,required},

   description:{type:String,required},

   imageFileSet:{type:String,required},
   
   publishedAt:{type:Date,default:Date.now()},


})

module.exports=mongoose.model('Posts',userSchema)