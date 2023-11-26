
const express=require('express')

const router=express.Router()

const nodemailer = require('nodemailer')


router.post('/',  async(req, res) => {
  const  email  = req.body.Email;
  const name = req.body.name;
  const  message  = req.body.message;

const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service (e.g., 'Gmail', 'Outlook', 'SMTP')
    auth: {
      user: process.env.EMAIL_ID, // Your email address
      pass: process.env.PASSWORD,      // Your email password or an app-specific password
    },
  });
  
  // Email data
  const mailOptions = {
    from: `"${email}" <${name}>`, // Sender's email address
    to: process.env.EMAIL_ID, // Recipient's email address
    subject: 'User Query', // Email subject
    text: message, // Email 
    replyTo : email
  };
  
  
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        res.status(400).json({error:"Something went wrong while sending email"});
    } else {
        res.status(200).json({message:"Message sent successfully"});
    }
  });


  })


module.exports = router