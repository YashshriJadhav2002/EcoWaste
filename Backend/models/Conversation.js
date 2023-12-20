const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    senderId: {
        type:String,
        required:true
    },
    receiverId:{
        type:String,
        required:true
    },
    
},{
    timestamps: true  // This option adds createdAt and updatedAt fields
  });

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;