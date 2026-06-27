const express = require("express")
const router = express.Router()
const musicController = require("../controller/music.controller.js")
const multer = require("multer")

const upload = multer({
    storage:multer.memoryStorage()
})

router.post("/upload",upload.single("music"), musicController.uploadMusic)

module.exports = router;