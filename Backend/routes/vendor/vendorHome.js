const express=require('express')

const router=express.Router()
const product=require('./../../models/productModel')

router.post('/',async(req,res)=>{

   
    const product_details=await product.find({Status1:0})
    if(product_details){

        const dataArray = Object.values(product_details);
        
        res.status(200).json({data:dataArray})


    }

   
    else
    res.status(400).json({message: "Cart is empty"})
})

module.exports=router;