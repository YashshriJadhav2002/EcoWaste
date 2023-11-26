const express = require('express')

const Company = require('../models/companyModel')
const router = express.Router()
const bcrypt = require('bcrypt')
const {validationResult, body} = require('express-validator')
const jwt = require('jsonwebtoken')
const nodemailer=require('nodemailer')

//routes


router.post('/',[

    body('Email','Enter valid Email').isEmail(),
    body('Password','Password field cannot be empty').notEmpty()

],async(req,res)=>{

    // let token;
    const error = validationResult(req)
    if(!error.isEmpty()) {

        return res.status(400).json({error: error.array() })


    }
    const company=await Company.findOne({Email:req.body.Email})
    if(!company)
        return res.status(400).json({error:[{path:"Email",msg:"company not registered"}]})

    else{
        const password=req.body.Password
        bcrypt.compare(password,company.Password, async function(err,response){

            
        
            if(response)  
            {   
                if(!company.isVerified)
                {
                    const transporter = nodemailer.createTransport({
                        service: 'Gmail', // Use your email service (e.g., 'Gmail', 'Outlook', 'SMTP')
                        auth: {
                                user: process.env.EMAIL_ID, // Your email address
                                pass: process.env.PASSWORD,      // Your email password or an app-specific password
                              },
                        });
                        
                        const verificationToken = jwt.sign(
                            { email: req.body.Email },
                            process.env.SECRET_KEY,
                            { expiresIn: '1d' }
                          );

                          const verificationLink = `http://localhost:3000/verifyCompany/${verificationToken}`;
                
                          const mailOptions = {
                          from: process.env.EMAIL_ID,
                          to: req.body.Email,
                          subject: 'Verify Your Email',
                          text: `Click on the following link to verify your email: ${verificationLink}`,
                          };
                          await transporter.sendMail(mailOptions);
          
                          res.status(400).json({error:[{path:"Email",msg:"Complete your Email Verification .Link send to Email"}]})
                }
                else
                {
                    const data={user:company.id}
                    const token=jwt.sign(data,process.env.SECRET_KEY)
    
                    return res.status(200).json({message:"Login Successfull", data:token})
                }
                

            }  
            else
            return res.status(400).json({error:[{path:"Password",msg:"Incorrect Password"}]})
                    
        })
    }
})


module.exports = router


  