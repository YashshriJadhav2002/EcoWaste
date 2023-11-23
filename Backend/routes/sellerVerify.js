const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const Seller=require('../models/sellerModel')

router.get('/', async (req, res) => {
    try {
        const token = req.query.token;
        console.log(token)
      // Verify the token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      // Update user's isVerified status
      const user=await Seller.findOneAndUpdate({ Email: decoded.email }, { isVerified: true });
      if(!user)
      res.status(400).json({ message: 'Invalid Link.' });
      else
      res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
      res.status(400).json({ error:error});
    }
  });

module.exports=router;
