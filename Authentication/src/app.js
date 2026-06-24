require("dotenv").config()
const express = require("express")
const authRoutes = require("../routes/auth.route.js")
const cookieParser = require("cookie-parser")
const postRoutes = require("../routes/post.route.js")

const app = express();
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/post", postRoutes)

module.exports = app;