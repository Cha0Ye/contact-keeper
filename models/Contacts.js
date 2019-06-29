const mongoose = require('mongoose');

// UserSchema fields 
const ContactSchema = mongoose.Schema({
    user: {
        // relationship between contact and user
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
    },
    phone: {
        type: String
    },
    type: {
        type: String
    },
    date: {
        type: Date, 
        default: Date.now
    }
});


module.exports = mongoose.model('contact', ContactSchema);