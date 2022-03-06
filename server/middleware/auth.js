const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    const token = req.cookies.token;

    if(token){
        jwt.verify(token,process.env.TOKEN_KEY,(err,decoded)=>{
            if(err) return res.json({
                isLoggedIn: false,
                message: "Unauthorized"
            })
            req.user ={};
            req.user = decoded;
            next();
        })
    }else {
        res.json({message:'Unauthorized',isLoggedIn:false})
    }
}

exports.auth = auth;