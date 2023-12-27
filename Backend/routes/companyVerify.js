const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const Company=require('../models/companyModel')

router.get('/', async (req, res) => {
    try {
        const token = req.query.token;
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      // Update user's isVerified status
      const user=await Company.findOneAndUpdate({ Email: decoded.email }, { isVerified: true });
      if(!user)
      res.status(400).json({ message: 'Invalid Link.' });
      else
      res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
      res.status(400).json({ error:error});
    }
  });

module.exports=router;
