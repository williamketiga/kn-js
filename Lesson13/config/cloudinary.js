const multer = require('multer')
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})
const storage = new CloudinaryStorage({
    cloudinary,
    params : async(req,file)=>{
        let folder = "posts/images"
        let resource_type = "image"
        if (file.mimetype.startsWith("video")) {
            folder = "posts/videos"
            resource_type = "video"
        }
        return{
            folder,
            resource_type,
            allowed_formats : [
                "jpg",
                "jpeg",
                "png",
                "mp4",
                "mov",
                "avi",
                "mkv"
            ]
        }
    }
})
const upload = multer ({storage})
module.exports = {upload, cloudinary}