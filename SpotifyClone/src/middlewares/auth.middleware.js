const express = require("express")
const jwt = require("jsonwebtoken")

async function authArtist(req,res,next) {
    const token = req.cookies.token
    if(!token){
        res.status(401).json({
            message:"Unauthorized access"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
        if(decoded.role != "artist"){
            return res.status(403).json({
                message : "You don't have access to this"
            })
        }
        req.user = decoded

        next()
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message:"Unauthorized access"
        })
        
    }
}

async function authUser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role != "user"){
            return res.status(403).json({
                message:"You dont have access to this"
            })
        }

        next()
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message:"Error while fetching the details"
        })
    }
}

module.exports = { authArtist , authUser } ; 