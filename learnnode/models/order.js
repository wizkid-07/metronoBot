const mongoose=require('mongoose');
const Schema= mongoose.Schema


const orderSchema = new Schema(
    {
         
    cuisine :
    {
        type:String,
        required:true

    },

    orderFor :
    {
        type:String,
        required:true

    },

    orderType :
    {
        type:String,
        required:true

    },

    size :
    {
        type:String,
        required:true

    },

    orderStatus :
    {
        type:String,
        required:true

    },

    deliveryPartner :
    {
        type:String,
        required:true

    },

    deliveryStatus :
    {
        type:String,
        required:true

    },

    paymentMode :
    {
        type:String,
        required:true

    },

    paymentId :
    {
        type:String,
        required:true

    },

    paymentStatus :
    {
        type:String,
        required:true

    },

    orderedUser :
    {
        type:Schema.Types.ObjectId,
        ref: 'User'
    }






},{timestamps:true});

module.exports=mongoose.model('Order',orderSchema)





