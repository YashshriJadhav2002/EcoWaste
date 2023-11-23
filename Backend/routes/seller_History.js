const express = require('express')
const router = express.Router()

const product = require('../models/productModel')
const refurbhishedProductmodel=require('../models/refurbishedProductModel')
const fetchUser = require('../middleware/authentication')

router.post('/',fetchUser, async(req, res) => {



    const id=req.user;

    const product_data=await product.find({user_id:id,Status1:1})
    const refurbhishedProduct=await refurbhishedProductmodel.find({vendor_id:id,Status1:1})
    if(product_data|| refurbhishedProduct)
    {

        
        res.status(200).json({message:"Product Sold",data:product_data,data2:refurbhishedProduct})
    }
    else
    {
        res.status(400).json({error:"Not Sold"})
    }




})


module.exports = router