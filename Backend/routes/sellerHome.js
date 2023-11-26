const express=require('express')

const router=express.Router()
const refurbishedProduct=require('./../models/refurbishedProductModel')

router.post('/',async(req,res)=>{

   
    const refurbishedProduct_details=await refurbishedProduct.find({Status1:0})
    if(refurbishedProduct_details){

        const dataArray = Object.values(refurbishedProduct_details);
        
        res.status(200).json({data:dataArray})


    }

   
    else
    res.status(400).json({message: "Cart is empty"})
})

module.exports=router;