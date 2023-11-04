const express = require('express')
const router = express.Router()

const product = require('../../models/productModel')
const fetchUser = require('../../middleware/authentication')

router.post('/',fetchUser, async(req, res) => {



    const id=req.user;

    const product_data=await product.find({vendor_id:id,Status1:1})
    if(product_data)
    {

        
        res.status(200).json({message:"Product Sold",data:product_data})
    }
    else
    {
        res.status(400).json({error:"Not Sold"})
    }




})


module.exports = router