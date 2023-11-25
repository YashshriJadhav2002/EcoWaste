const express = require('express')
const product = require('../../models/refurbishedProductModel')
const productToken = require('../../middleware/refurbishedProductAuth')


const router = express.Router()

router.post('/',productToken, async (req,res)=> {

            const timestamp = new Date(Date.now()); // Replace this with your timestamp
             console.log(timestamp)
            const year = timestamp.getFullYear();
            const month = timestamp.getMonth() + 1; // Months are 0-indexed, so add 1
            const day = timestamp.getDate();
            const formattedDate = `${day}-${String(month).padStart(2, '0')}-${String(year).padStart(2, '0')}`;



        const productId = req.refurbishedproduct
        const value=await product.findOneAndUpdate({_id:productId},{ Status1:0,Status2:true, selling_date: formattedDate })

        try
        {
            const value=await product.findOneAndUpdate({_id:productId},{ Status1:0,Status2:true, selling_date: formattedDate })
            console.log(value)
            if(value)
            res.status(200).json({message:"Product added to cart"})
            else
            res.status(400).json({error:"Error"})
        }
        catch(err)
        {
            res.status(400).json({error:err})

        }
});

module.exports = router