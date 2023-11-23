const express = require('express')
const Product = require('../models/productModel')
const fetchProduct=require('../middleware/productAuth')
const MyRandomForestRegressor = require('./randomforest')
const myModel = new MyRandomForestRegressor()
const router = express.Router()

myModel.train()
  .catch((error) => console.error(error));

router.post('/',fetchProduct, async(req, res) => {

    try{
        const product_id=req.product;
        console.log("Product id ", product_id)
        const product = await Product.findById(product_id)
        console.log("product data ",product)
        if(product) {
            const inputFeatures = {'cost':product.BuyingPrice,'Age':product.Age};
            const prediction = myModel.predict(inputFeatures);
            const newdata=await Product.findOneAndUpdate({_id:product_id},{SellingPrice:prediction})
           // res.json({ prediction });
           console.log("predicted value",prediction)
           console.log("new product data",newdata)
            res.status(200).json({data:
               newdata
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