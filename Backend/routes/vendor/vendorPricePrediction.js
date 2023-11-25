const express = require('express')

const Product = require('../../models/refurbishedProductModel')
const {validationResult,body}=require('express-validator')
const fetchUser = require('../../middleware/authentication')
const router = express.Router()
const jwt=require('jsonwebtoken')

router.post('/',[
    body('Name', 'Name field cannot be blank').notEmpty(),
    body('BuyingPrice', 'Buying Price cannot be empty').notEmpty(),
    body('BuyingPrice', 'Please enter valid buying price').isNumeric(),
    body('Age', 'Enter valid age').isNumeric(),
    body('isDisplay','Display Field cannot be empty').notEmpty(),
    body('isCond','Condition Field cannot be empty').notEmpty(),
    body('isSecond','Second hand Field cannot be empty').notEmpty()

], fetchUser, async(req,res)=> {

    const error = validationResult(req)
    if (!error.isEmpty()) 
    {
        res.status(400).json({ error: error.array() })
    }
   
    else

    {

        
        const user_id = req.user
        const {Name, BuyingPrice, Age,  isDisplay, isCond, isSecond, Avatar} = req.body

        try {



            const product = await Product.create({Name, BuyingPrice, Age,isDisplay, isCond, isSecond, Avatar, user_id})
            const data={refurbishedproduct:product.id}
            const token=jwt.sign(data,process.env.SECRET_KEY)
            res.status(200).json({message:"Product Saved Successfully",data:token})
           


        } catch(err) {

            res.status(400).json({ error:[{path:"Database",msg:err.message}]})

        }

    }
})


module.exports = router