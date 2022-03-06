const express = require('express');
const router = express.Router();
const {Haiku} = require('../models/haiku');
const {auth} = require("../middleware/auth");
const mongoose  = require('mongoose');

router.get('/', async (req,res)=>{
    try{
        const haiku = await Haiku.find();
        res.status(200).json(haiku); 
    }catch(error){
        res.status(404).json({message: error.message});
    }
})

router.post('/', auth, async(req,res)=>{
    const {haiku_line_1,haiku_line_2,haiku_line_3,createdAt} = req.body;

    const haikuSaved = new Haiku({
        haiku_line_1,
        haiku_line_2,
        haiku_line_3,
        userInfo:req.user,
        postedBy:req.user.username,
        createdAt
    });

    try{
        await haikuSaved.save();
        res.status(200).json(haikuSaved);
    }catch(error){
        res.status(409).json({message:error.message});
    }
})

router.get('/userPosts', auth, async(req,res)=>{
    try{
        const haiku = await Haiku.find({userInfo:req.user._id});
        res.status(200).json(haiku);
    }catch(err){
        res.status(404).json({message:error.message})
    }
})

router.patch('/userPosts/:id', auth , async(req,res)=>{
    try{
        const { id:_id } = req.params;
        const {haiku_line_1,haiku_line_2,haiku_line_3} = req.body;
    
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Invalid ID');
    
        const updatedHaiku = await Haiku.findByIdAndUpdate(_id,{haiku_line_1,haiku_line_2,haiku_line_3},{new:true});
    
        res.json(updatedHaiku);   
    }catch(err){
        console.log(err)
    }
});

router.delete('/userPosts/:id', auth , async(req,res)=>{
    try{
        const {id:_id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Invalid ID');
        await Haiku.findByIdAndDelete(_id);
    }catch(err){
        res.status(404).json({message:error.message});
    }
})

module.exports = router;