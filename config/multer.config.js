const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary.config.js');

// Create a Cloudinary storage engine for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // Cloudinary instance from cloudinary.config.js
  params: {
    folder: 'drive',      // Folder name where the files will be stored on Cloudinary
   // allowed_formats : [], // Allowed file formats
  },
  unique_filename:true
});

// Create the Multer upload instance using the Cloudinary storage engine
const upload = multer({ storage: storage });

module.exports = upload;
