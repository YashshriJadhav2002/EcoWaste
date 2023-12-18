const express=require('express')
const auth=require('../middleware/authentication')
const router=express.Router()
const product=require('../models/productModel')

router.post('/',auth,async(req,res)=>{


    const user_id=req.user
    console.log(user_id)
    const product_details=await product.find({company_id:user_id, companybuy:true,Status3:0})
    if(product_details){

        const dataArray = Object.values(product_details);
        res.status(200).json({data:dataArray})

    }   
    else
    res.status(400).json({message: "Cart is empty"})
})

module.exports=router;