const express = require("express")
const app = express()
const validationResult = require("./middlewares/validation.middleware.js")

app.use(express.json())

app.get("/", (req,res) => {
    res.status(200).json({
        message:"Hello World"
    })
})

app.post("/register", validationResult.userRegistrationValidationRules ,(req,res) => {
    const {username,email,password} = req.body

    res.status(201).json({
        message:"User registered successfully",
        user:{username,email}
    })
})

module.exports = app ;