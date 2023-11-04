const express = require('express')

const Seller = require('../models/sellerModel')
const router = express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const { validationResult, body } = require('express-validator')
//routes
router.post('/',[
    body('Email','Enter valid Email').isEmail(),
    body('Password','Password field cannot be empty').notEmpty()

],async(req,res)=>{

    // let token;
    const error = validationResult(req)
    if(!error.isEmpty()) {

        return res.status(400).json({error: error.array() })


    }
    const seller=await Seller.findOne({Email:req.body.Email})
    if(!seller)
        return res.status(400).json({error:[{path:"Email",msg:"Seller not registered"}]})

    else{
        const password=req.body.Password
        bcrypt.compare(password,seller.Password, async function(err,response){

            
        
            if(response)  
            {
                const data={user:seller.id}
                const token=jwt.sign(data,process.env.SECRET_KEY)

                return res.status(200).json({message:"Login Successfull", data:token})

            }  
            else
            return res.status(400).json({error:[{path:"Password",msg:"Incorrect Password"}]})
                    
        })
    }
})


module.exports = router
