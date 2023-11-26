const express = require('express')

const buyer_model = require('../../models/buyerModel')
const fetchAuth = require('../../middleware/authentication')
const router=express.Router()



router.post('/',fetchAuth,async(req,res)=>{
   
    try
    {
        const u_id=req.user
        const { Name, Phone, Address, Email,City,State,Avatar} = req.body
        const user=await buyer_model.findOneAndUpdate({_id:u_id},{Name:Name,Phone:Phone,Address:Address,City:City,Email:Email,State:State,Avatar:Avatar})
        if(user)
        {
            res.status(200).json({message:"Profile Updated Successfully !!"})
        }
        else
        {
            res.status(400).json({error:"Cannot Update Profile !!"})
        }
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }

})

module.exports=router