
const multer = require("multer"); 
const path = require("path");
const fs = require("fs");


// multer setup
const storage = multer.diskStorage({
  destination: "../server/public/uploads",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});



function checkFileType(file, cb) {
  const filetypes = /mp3|wav/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error! Only audios are valid.");
  }
}


module.exports = upload;