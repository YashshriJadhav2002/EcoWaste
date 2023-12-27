const express=require('express')

const router=express.Router()
const vendorModel=require('./../models/buyerModel')

router.post('/',async(req,res)=>{

    const cityname=req.body.cityname

    const vendorModel_details=await vendorModel.find({City:cityname})
    if(vendorModel_details){

        const dataArray = Object.values(vendorModel_details);
        
        res.status(200).json({data:dataArray})


    }

   
    else
    res.status(400).json({message: "Cart is empty"})
})

module.exports=router;