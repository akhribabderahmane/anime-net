import multer from "multer";
import path from 'path'
import fs from 'fs'

// Directory where uploads will be stored
const uploadDirectory = 'uploads/profile-pictures';
// Ensure that the upload directory exists
fs.mkdirSync(uploadDirectory, { recursive: true });

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req,file,cb) {
      cb(null,uploadDirectory); // specify destination folder
    },
    filename:function (req,file, cb) {
      // generate unique file name
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
  // Initialize multer
  const upload = multer({ storage: storage });

  export {upload};