const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models/users');
const jwt = require('jsonwebtoken');

router.post('/register',async(req,res)=>{
    try{
        const {username, email, password, passwordVerify } = req.body;

        // if(!(username&&email&&password&&passwordVerify)){
        //     res.status(400).send('All inputs are required');
        // }
        const oldUsername = await User.findOne({username});
        if(oldUsername){
            return res.status(400).send('Username already exists')
        }

        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.status(400).send('Email already exists');
        }

        if(password!==passwordVerify){
            return res.status(400).send('Passwords dont match')
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username: username,
            email: email,
            password:encryptedPassword,
            passwordVerify:encryptedPassword
        })
        
        await user.save();
        const token = user.generateAuthToken();
        user.token = token;

        //send token in a cookie
        res.cookie('token',token,{
            httpOnly:true
            // secure: true,
            // sameSite: "none"
        }).send()
    }catch(err){
        console.log(err);
    }
})

router.post('/login', async(req,res)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email: email});

        if(user && (await bcrypt.compareSync(password, user.password))){
            const token = user.generateAuthToken();
            user.token = token;
            res.cookie('token',token,{
                httpOnly:true
                // secure: true,
                // sameSite: "none"
            }).send()
        }else{
            res.status(401).send('Invalid Email or Password');
        }
    }catch(err){
        console.log(err);
    }
})

router.get('/logout',(req,res)=>{
    res.cookie('token','',{
        httpOnly:true,
        expires: new Date(0)
        // secure: true,
        // sameSite: "none"
    }).send();
})

router.get('/loggedIn', (req,res)=>{
    try{
        const token = req.cookies.token;
        if(!token) return res.json(false);

        jwt.verify(token,process.env.TOKEN_KEY);
        
        res.send(true)
    }catch(err){
        res.json(false);
    }
})

module.exports = router;