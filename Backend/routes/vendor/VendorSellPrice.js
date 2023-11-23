const express = require('express')

const Product = require('../../models/refurbishedProductModel')
const fetchProduct=require('../../middleware/productAuth')

const router = express.Router()

router.post('/',fetchProduct, async(req, res) => {

    try{
        const product_id=req.product;
        
        const product = await Product.findById(product_id)

        console.log(product);
        if(product) {

            res.status(200).json({data:
               product
            })
        }
    }
        catch(err)
        {
            res.status(400).json({error:[{
                path:"Database",
                message:err.message
        }]})
        }
})

module.exports = router