const express=require('express')
const router=express.Router()
const vendor=require('../models/buyerModel')
const Users=require('../models/sellerModel')

router.get('/', async (req, res) => {
    try 
    {
    const userId = req.query.userId;
    let users = await vendor.findById(userId) || await Users.findById(userId);
    if (users) 
    {
        const usersData = [{
            user: {
                Email: users.Email,
                Name: users.Name,
                receiverId: users._id,
                Avatar: users.Avatar
            }
        }];

        res.status(200).json(usersData);
    }
    else
    {
        res.status(404).json({ error: 'User not found' });
    }

    } 
    catch (error) {
        console.log('Error', error)
    }
})

module.exports=router;
