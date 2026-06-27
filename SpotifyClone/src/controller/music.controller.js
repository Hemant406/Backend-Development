const musicModel = require("../models/music.model.js")
const jwt = require("jsonwebtoken")
const {uploadFile} = require("../services/storage.service.js")
const userModel = require("../models/user.model.js")

async function uploadMusic(req,res){
    const token = req.cookies.token

    if(!token){
        return res.status(409).json({
            message:"Unauthorized access"
        })
    }

    try{
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)

        if(decoded.role !== "artist"){
            return res.status(403).json({
                message:"You don't have access to upload a music"
            })
        }

        const {title} = req.body
        const file = req.file

        const result = await uploadFile(file.buffer.toString("base64"))

        const music = await musicModel.create({
            uri:result.url,
            title,
            artist:decoded.id
        })

        res.status(201).json({
            message:"Music created successfully",
            music:{
                id:music.id,
                uri:music.uri,
                title:music.title,
                artist:music.artist
            }
        })

    }catch(err){
        console.log("Error uploading music ",err);
    }
}

module.exports = { uploadMusic }