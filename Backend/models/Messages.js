const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    conversationId: {
        type: String,
    },
    senderId: {
        type: String
    },
    message: {
        type: String
    }, 
    
},{
    timestamps: true  // This option adds createdAt and updatedAt fields
  });

const Messages = mongoose.model('Message', messageSchema);

module.exports = Messages;