const express = require('express');
const auth=require('../middleware/authentication');
const product = require('../models/productModel');
const productToken = require('../middleware/productAuth');


const router = express.Router()

router.post('/',auth, async (req,res)=> {
        const user_id = req.user
        console.log(user_id)
        const productId = req.body.product_id
        const value=await product.findOneAndUpdate({_id:productId},{ companybuy:true ,company_id:user_id})

        if(value)
        res.status(200).json({message:"Product added to cart"})
        else
        res.status(400).json({error:"error"})
});

module.exports = router