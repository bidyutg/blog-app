const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


// Compare password during login
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
