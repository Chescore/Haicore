const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'This field is required'],
        lowercase:true
    },
    email:{
        type:String,
        required:[true,'This field is required'],
        lowercase:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Enter a valid email address'],
        trim: true
    },
    password:{
        type:String,
        required:[true,'Enter a password']
    },
    passwordVerify:{
        type:String,
        required:[true,'Retype your password']
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,email:this.email,username:this.username},process.env.TOKEN_KEY);
    return token;
}

const User = mongoose.model('User', userSchema);

exports.User = User;