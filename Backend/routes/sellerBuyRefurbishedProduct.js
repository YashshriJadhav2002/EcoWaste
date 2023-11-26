const express=require('express')
const fetchAuth = require('../middleware/authentication')
const router=express.Router()
const product=require('./../models/refurbishedProductModel')
const user = require("./../models/buyerModel")
const { Vonage } = require('@vonage/server-sdk')



router.post('/',fetchAuth, async (req, res) => {

    const product_id = req.body.product_id
    const vendor_id = req.user

    const timestamp = new Date(Date.now()); // Replace this with your timestamp
             console.log(timestamp)
            const year = timestamp.getFullYear();
            const month = timestamp.getMonth() + 1; // Months are 0-indexed, so add 1
            const day = timestamp.getDate();
            const formattedDate = `${day}-${String(month).padStart(2, '0')}-${String(year).padStart(2, '0')}`;

    const productDetails = await product.findOneAndUpdate({_id:product_id},{Status1:1,vendor_id:vendor_id,buying_date:formattedDate})
   
    
    if(productDetails) {


        const user_id = productDetails.user_id;
        const userDetails = await user.findOne({_id:user_id})
        if(userDetails) {

            const phone = userDetails.Phone

            const vonage = new Vonage({
                apiKey: "0efa11fa",
                apiSecret: "kDjOqur1ygMUizcA"
              })


              const from = "Vonage APIs"
                const to = `918459777201`
                const text = 'Dear User, Congratulations! Your product has been sold. Please check history for further details'

                async function sendSMS() {
                    await vonage.sms.send({to, from, text})
                        .then(resp => {res.status(200).json({message:"Order Placed!"})
                        ; console.log(resp); })
                        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
                }

                sendSMS();
          
        }



    }
    else {

        res.status(400).json({error:"Cannot Place order"})
    }


})

module.exports = router