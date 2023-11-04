const mongoose = require('mongoose')

const schema = mongoose.Schema

const BuyerSchema = new schema({

    Name: {
        type: String
      
    },

    Phone: {
        type: Number,
        unique:true
        
    },

    Address: {
        type: String
        

    },

    Email: {
        type: String,
        unique:true
       

    },

    Password: {
        type: String
    },

    City: {
        type: String
    },

    State: {
        type: String

    },
    Avatar:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",

    }


})

module.exports = mongoose.model('Buyer', BuyerSchema)