const cloudinary = require('cloudinary').v2
const fs = require('fs')

    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
    
//    const uploadOnCloudinary = async(localFilepath)=>{
//     try {
//         if(!localFilepath)return "FILE not found"
//         const response = await cloudinary.uploader.upload(localFilepath,{
//             resource_type: 'auto'
//         })
//             //file successfully uploaded
//             console.log("file uploaded ", response )
//             res.json({response})

//     } catch (error) {
//         fs.unlink(localFilepath)
//         return "file successfully deleted"
//     }

//    }

module.exports= cloudinary