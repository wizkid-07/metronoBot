const mongoose=require('mongoose')
const Schema =mongoose.Schema


const userSchema =new Schema(
    {
        name:{
            type:String,
            required:true
        },
        mobile:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },

        referralcode :
        {
            type:String,
            required:false

        },
        referralcount :
        {
            type:Number,
            required:false

        },

        chatId:
        {
            type:String,
            required:true
        }


    }
);



module.exports =mongoose.model('User',userSchema);