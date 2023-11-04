const mongoose = require('mongoose')

const schema = mongoose.Schema

const  CompanySchema = new schema({

    Name: {
        type: String,
        required: true
    },

    Address: {
        type: String,
        required: true

    },

    Email: {
        type: String,
        required: true

    },

    Phone: {
        type: String,
        required: true

    },

    Password: {
        type: String,
        
    },
    City:
    {
        type:String,
       
    
    },
    State:{
        type:String,
    
    },
    Avatar:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",

    }

    

})

module.exports = mongoose.model('Company', CompanySchema)