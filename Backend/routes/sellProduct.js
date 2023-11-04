const express = require('express')
const product = require('../models/productModel')
const productToken = require('../middleware/productAuth')


const router = express.Router()

router.post('/',productToken, async (req,res)=> {

            const timestamp = new Date(Date.now()); // Replace this with your timestamp
             console.log(timestamp)
            // Extract the date part (year, month, and day)
            const year = timestamp.getFullYear();
            const month = timestamp.getMonth() + 1; // Months are 0-indexed, so add 1
            const day = timestamp.getDate();
            const formattedDate = `${day}-${String(month).padStart(2, '0')}-${String(year).padStart(2, '0')}`;



        const productId = req.product
        const value=await product.findOneAndUpdate({_id:productId},{ Status1:0,Status2:true, selling_date: formattedDate })

        if(value)
        res.status(200).json({message:"Product added to cart"})
        else
        res.status(400).json({error:"error"})
});

module.exports = router