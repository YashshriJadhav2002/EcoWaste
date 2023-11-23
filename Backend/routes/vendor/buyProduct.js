const express=require('express')
const fetchAuth = require('../../middleware/authentication')
const router=express.Router()
const product=require('./../../models/productModel')
const user = require("./../../models/sellerModel")
const { Vonage } = require('@vonage/server-sdk')
const nodemailer = require('nodemailer')
const vendor=require('./../../models/buyerModel')
const stripe=require('stripe')('sk_test_51OA6VNSBOVYSI690yxeBca5IRIJoGvpL0G1XhctCk1UPJd8to3W4l4xHyVitIALkhnklFT8jcXsXM0aKvYSIzQ7U00LrZblotA')
const { v4: uuidv4 } = require('uuid');


router.post('/',fetchAuth,async(req,res)=>{
      const vendor_id = req.user
      const product_id = req.body.product_id;
      const data = await product.findById({ _id: product_id });
      const amount = data.SellingPrice * 100;

      const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items: [
          {
            price_data: {
              currency:"inr",
              product_data:{name:data.Name},
              unit_amount:amount
              },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      });
     
      if (session.success_url === 'http://loalhost:3000/success') {
          console.log(session.success_url)
            const timestamp = new Date(Date.now()); 
            const year = timestamp.getFullYear();
            const month = timestamp.getMonth() + 1; // Months are 0-indexed, so add 1
            const day = timestamp.getDate();
            const formattedDate = `${day}-${String(month).padStart(2, '0')}-${String(year).padStart(2, '0')}`;

    const productDetails = await product.findOneAndUpdate({_id:product_id},{Status1:1,vendor_id:vendor_id,buying_date:formattedDate})
  
        const user_id = productDetails.user_id;
        const userDetails = await user.findOne({_id:user_id})
        if(userDetails) {

            // const phone = userDetails.Phone
            const email=userDetails.Email

            const vonage = new Vonage({
                apiKey: "0efa11fa",
                apiSecret: "kDjOqur1ygMUizcA"
              })


              const from = "Vonage APIs"
                const to = '918459777201'
                const text = 'Dear User, Congratulations! Your product has been sold. Please check history for further details'

                async function sendSMS() {
                await vonage.sms.send({to, from, text})
                .then(resp => {
                            const transporter = nodemailer.createTransport({
                                service: 'Gmail', // Use your email service (e.g., 'Gmail', 'Outlook', 'SMTP')
                                auth: {
                                  user: process.env.EMAIL_ID, // Your email address
                                  pass: process.env.PASSWORD,      // Your email password or an app-specific password
                                },
                              });
                              
                              // Email data
                              const mailOptions = {
                                from: process.env.EMAIL_ID, // Sender's email address
                                to: email, // Recipient's email address
                                subject: 'Product Sold', // Email subject
                                text: 'Dear User, Congratulations! Your product has been sold. Please check history for further details', // Email content
                              };
                              
                              // Send the email
                              transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    res.status(400).json({error:"Something went wrong while sending email"});
                                } else {
                                    res.status(200).json({message:"Order Placed!"});
                                }
                              });
            
                            
                    
            
            
                         })
                        .catch(err => {res.status(400).json({error:"Something went wrong while sending message"}); console.error(err); });
                }

                sendSMS();


            }

    
    
    }
      res.json({id:session.id});
      
    });

module.exports = router