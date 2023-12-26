const express=require('express')
const auth=require('../middleware/authentication')
const router=express.Router()
const product=require('../models/productModel')

router.post('/',auth,async(req,res)=>{


    const user_id=req.user
    const product_details=await product.find({company_id:user_id, companybuy:true ,Status1:1,Status3:1,Status2:true})
    if(product_details){

        const dataArray = Object.values(product_details);
        res.status(200).json({data:dataArray})

    }   
    else
    res.status(400).json({message: "Product Sold"})
})

module.exports=router;