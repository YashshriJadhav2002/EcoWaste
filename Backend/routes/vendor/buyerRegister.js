const express = require('express')

const Buyer = require('../../models/buyerModel')
const { validationResult, body } = require('express-validator')
const router = express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')

let message;
//routes
router.post('/',[

    body('Phone','Enter valid phone number').isLength({min:10}),
    body('Email','Enter valid email').isEmail(),
    body('Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)'),
    body('Name', 'Name field cannot be blank').notEmpty(),
    body('Address', 'Address Field cannot be blank').notEmpty(),
    body('City', 'City Field cannot be blank').notEmpty(),
    body('State', 'State Field cannot be blank').notEmpty()



    ],async (req,res)=>{

        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(400).json({ error: error.array() })
        }
        else{

            const reqpassword=req.body.Password
            const salt=await bcrypt.genSalt(10)
            const securepass=await bcrypt.hash(reqpassword,salt)
            req.body.Password=securepass;
            const {Name, Phone, Address, Email, Password, City, State,Avatar} = req.body

            try{
                const existingUser=await Buyer.findOne({Email:req.body.Email})
                if(existingUser)
                message="Email already Registered"
                else 
                {
                    const existingUser1=await Buyer.findOne({Phone:req.body.Phone})
                    if(existingUser1)
                    message="Phone no already Registered"
                }
                
               
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
                const buyer = await Buyer.create({ Name, Phone, Address, Email ,Password,City,State,Avatar,verificationToken})
                
                const verificationLink = `http://localhost:3000/verifyVendor/${verificationToken}`;
                
                const mailOptions = {
                from: process.env.EMAIL_ID,
                to: req.body.Email,
                subject: 'Verify Your Email',
                text: `Click on the following link to verify your email: ${verificationLink}`,
                };
                await transporter.sendMail(mailOptions);

                res.status(200).json({message:"An Email verification link sent to your mail.Verify to register"})

            } catch (e) {

                res.status(400).json({ error:[{path:"Database",msg:e.message} ]})

            }
        }

    })

   


module.exports = router
