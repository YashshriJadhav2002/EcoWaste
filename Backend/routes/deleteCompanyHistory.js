const express = require('express')

const Product = require('../models/productModel')
const router = express.Router()


router.post('/', async(req, res) => {

    
    const product_id =req.body.product_id;
    try
    {
        details=await Product.findById({_id:product_id})
        

    }
    catch(err)
    {
        res.status(400).json({error:err.message})
    }

    if(details){
    if(details.user_id=="" )
    {
        try{     
            const product_data=await Product.findOneAndDelete({_id: product_id})

            res.status(200).json({message: "Product removed from history"})
    
        }
        catch(err) {
    
            res.status(400).json({error: err.message})
        }
    

    }
    else{
        try{     
            const product_data=await Product.findOneAndDelete({_id: product_id},{vendor_id:""})

            res.status(200).json({message: "Product removed from history"})
    
        }
        catch(err) {
    
            res.status(400).json({error: err.message})
        }
    

    }
    }
})
    module.exports = router 