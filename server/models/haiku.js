const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const syllable = require('syllable')

const haikuSchema = new mongoose.Schema({
    haiku_line_1:{
        type: String,
        required: true,
        validate:{
            validator: function(v){
                return syllable(v)===5
            },
            message: "The first line should have 5 syllables."
        },
    },
    haiku_line_2:{
        type: String,
        required: true,
        validate:{
            validator: function(v){
                return syllable(v)===7
            },
            message: "The first line should have 7 syllables."
        },
    },
    haiku_line_3:{
        type: String,
        required: true,
        validate:{
            validator: function(v){
                return syllable(v)===5
            },
            message: "The first line should have 5 syllables."
        },
    },
    userInfo:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    postedBy:{
        type:String,
    },
    createdAt:{
        type: String
    }
})

const Haiku = mongoose.model('Haiku' , haikuSchema);

exports.Haiku = Haiku; 