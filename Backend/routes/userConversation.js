const express=require('express')
const router=express.Router();
const Conversations=require('../models/Conversation')
const vendor=require('../models/buyerModel')
const users=require('../models/sellerModel')

router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;
        const conversations = await Conversations.find({
            $or: [
              { senderId: userId },
              { receiverId: userId }
            ]
          });
        const conversationUserData = Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.receiverId === userId ? conversation.senderId : conversation.receiverId;
            var user = await vendor.findById(receiverId);
            if(user)
            {
                return {
                    user: {
                      receiverId: user._id,
                      Email: user.Email,
                      Name: user.Name,
                      Avatar: user.Avatar
                    },
                    conversationId: conversation._id
                  };
            }
            else
            {
                user=await users.findById(receiverId)
                return {
                    user: {
                      receiverId: user._id,
                      Email: user.Email,
                      Name: user.Name,
                      Avatar: user.Avatar
                    },
                    conversationId: conversation._id
                  };
            }
            
          }));
          
          res.status(200).json(await conversationUserData);
    } catch (error) {
        console.log(error, 'some Error')
    }
})

module.exports=router;