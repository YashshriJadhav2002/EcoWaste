const express = require('express');
const product = require('../models/productModel');
const productToken = require('../middleware/productAuth');


const router = express.Router()

router.post('/', async (req,res)=> {
        const productId = req.body.product_id
        const value=await product.findOneAndUpdate({_id:productId},{ companybuy:true })

        if(value)
        res.status(200).json({message:"Product added to cart"})
        else
        res.status(400).json({error:"error"})
});

module.exports = router