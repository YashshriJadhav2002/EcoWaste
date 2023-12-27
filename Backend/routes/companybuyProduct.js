const express=require('express')
const router=express.Router()
const productModel=require('../models/productModel')
const { Vonage } = require('@vonage/server-sdk')
const nodemailer = require('nodemailer')
const vendor=require('../models/buyerModel')
const stripe=require('stripe')('sk_test_51OA6VNSBOVYSI690jPwAb9szLozVjvdrI9TQd3REdDJl2yxtG9hZ68Bc27gxjrUK70EYnY94NXPV1hrYPXPPw8oM00merBSC8u')
const { v4: uuidv4 } = require('uuid');


router.post('/',async(req,res)=>{
    const {product}=req.body;
    let productDetails;

    const lineItems=product.map((product)=>({

        price_data: {
            currency:"inr",
            product_data:{name:product.Name},
            unit_amount:Math.ceil(product.SellingPrice*100),
            },
          quantity: 1,
    }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items:lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success/company",
        cancel_url: "http://localhost:3000/cancel/company",
      });
     
      if (session.success_url === 'http://localhost:3000/success/company') {
            const timestamp = new Date(Date.now()); 
            const year = timestamp.getFullYear();
            const month = timestamp.getMonth() + 1; // Months are 0-indexed, so add 1
            const day = timestamp.getDate();
            const formattedDate = `${day}-${String(month).padStart(2, '0')}-${String(year).padStart(2, '0')}`;
            
            const uniqueVendorIds = [...new Set(product.map(product => product.vendor_id))];


            const update = async () => {
              try {
                await Promise.all(
                  product.map(async (product) => {
                    const productDetails = await productModel.findOneAndUpdate(
                      { _id: product._id },
                      { Status3: 1, buying_date: formattedDate }
                    );
                    return productDetails;
                  })
                );
              } catch (error) {
                console.error("Error updating products:", error);
              }
            };
            
            await update();
            
            const vendorEmails = await vendor.find({ _id: { $in: uniqueVendorIds } }).distinct('Email');
        if(vendorEmails) {

            const vonage = new Vonage({
                apiKey: "0efa11fa",
                apiSecret: "kDjOqur1ygMUizcA"
              })


              const from = "Vonage APIs"
                const to = `918459777201`
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
                              vendorEmails.forEach((email) => {
                                const mailOptions = {
                                  from: process.env.EMAIL_ID,
                                  to: email,
                                  subject: 'Product Sold',
                                  text: 'Dear User, Congratulations! Your product has been sold. Please check history for further details',
                                };
                              
                                transporter.sendMail(mailOptions, (error, info) => {
                                  if (error) {
                                    console.error("Error sending email:", error);
                                  } else {
                                    console.log("Email sent to:", email);
                                  }
                                });
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