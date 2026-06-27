const {ImageKit} = require("@imagekit/nodejs")

const client = new ImageKit({
    privateKey:process.env.IMAGE_KIT
})

async function uploadFile(file){
    const result = await client.files.upload({
        file,
        fileName : "music_" + Date.now(),
        folder:"hemant406/music"
    })

    return result;
}

module.exports = {uploadFile }