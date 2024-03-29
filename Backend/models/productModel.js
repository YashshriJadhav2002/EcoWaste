const mongoose = require('mongoose')

const schema = mongoose.Schema

const ProductSchema = new schema({

    Name: {
        type: String
      
    },

    BuyingPrice: {
        type: Number,
        
        
    },

    Age: {
        type: Number
        

    },

    SellingPrice: {
        type: Number,
    },

    

    isDisplay: {
        type: String
    },

    isCond: {
        type: String

    },
    isSecond: {
        type: String

    },
    Avatar:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",

    },
    Status1: {
        type: Number,
        default:-1
    },
    Status2: {
        type: Boolean,
        default:false

    },
    Status3 : {
        type: Number,
        default:0
    },
    
    companybuy: {
        type: Boolean,
        default:false

    },
    user_id: {

        type:String

    },
    selling_date: {
        type:String,
    },

    isEdit:{
        type:Boolean,
        default:false,
    },

    buying_date : {
        type:String
    },

    vendor_id: {
        type:String
    },

    company_id: {
        type:String,
    }

 


})

module.exports = mongoose.model('Product', ProductSchema)