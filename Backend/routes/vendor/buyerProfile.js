const express=require('express')
const fetchToken = require('../../middleware/authentication')
const vendorModel = require('../../models/buyerModel')
const router=express.Router()


router.post('/',fetchToken,async(req,res)=>{

    try
    {
        const userid=req.user
        const details=await vendorModel.findById(userid).select("-Password")
        if(details)
        return res.status(200).json({data:details})
    }
    catch(err)
    {
        return res.status(400).json({error:err.message})
    }
})


module.exports=router;