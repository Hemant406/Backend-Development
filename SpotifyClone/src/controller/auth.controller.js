const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")

async function registerUser(req,res){
    const {username,email,password,role="user"} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"User already exists"
        })
    }

    const hash = await bcrypt.hash(password,10);

    const user = await userModel.create({
        username,
        email,
        password:hash,
        role
    })

    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token);

    res.status(201).json({
        message:"user created successfully",
        user : {
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
    })
}

async function loginUser(req,res){
    const {username,email,password} = req.body;

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){
        res.status(404).json({
            message:"User Not Found"
        })
    }

    const verify = await bcrypt.compare(password,user.password)

    if(!verify){
        return res.status(409).json({
            message:"Invalid Credentials"
        })
    }

    const token = await jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
    })
}

async function logoutUser(req,res){
    res.clearCookie("token")
    return res.status(200).json({
        message:"User logged out successfully"
    })
}

module.exports = { registerUser , loginUser , logoutUser };