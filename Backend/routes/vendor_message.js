const express=require('express')
const router=express.Router()
const Users=require('../models/sellerModel')

router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;
        const users = await Users.find({ _id: { $ne: userId } });
        const usersData = Promise.all(users.map(async (user) => {
            return { user: { email: user.Email, fullName: user.Name, receiverId: user._id } }
        }))
        res.status(200).json(await usersData);
    } catch (error) {
        console.log('Error', error)
    }
})

module.exports=router;
