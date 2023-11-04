const mongoose = require('mongoose')
const schema = mongoose.Schema

const SellerSchema = new schema({

    Name : {
        type: String,
        
    },

    Phone: {
        type: Number,
        
        unique:true
    },

    Address: {
        type: String,
     
    },
    City:
    {
        type:String,
       
    
    },
    State:{
        type:String,
    
    },

    Email:{
        type: String,
        unique:true
    },
    Password:{
        type:String,
        
    },
    Avatar:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    }


})


module.exports = mongoose.model('Seller', SellerSchema)