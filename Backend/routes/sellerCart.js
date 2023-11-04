const express=require('express')
const auth=require('../middleware/authentication')
const router=express.Router()
const product=require('../models/productModel')

router.post('/',auth,async(req,res)=>{

    const user_id=req.user
    const product_details=await product.find({user_id:user_id,Status1:0,Status2:true})
    if(product_details){

        const dataArray = Object.values(product_details);
        res.status(200).json({data:dataArray})


    }

   
    else
    res.status(400).json({message: "Cart is empty"})
})

module.exports=router;