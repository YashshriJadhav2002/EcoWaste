const express=require('express')
const productModel =require('../models/productModel')
const fetchAuth=require('../middleware/productAuth')

const router=express.Router()


router.post('/',fetchAuth,async(req,res)=>{
   
    try
    {
        const u_id=req.product
        const { SellingPrice} = req.body
        const user=await productModel.findOneAndUpdate({_id:u_id},{SellingPrice:SellingPrice})
        if(user)
        {
            res.status(200).json({message:"Selling Price Updated Successfully !!"})
        }
        else
        {
            res.status(400).json({error:"Cannot Update Selling Price !!"})
        }
    }
    catch(err)
    {
        res.status(400).json({error:"Something went wrong"})
    }

})

module.exports=router