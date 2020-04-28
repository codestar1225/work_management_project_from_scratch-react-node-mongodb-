var multer = require('multer');
var uuid = require('uuid/v4');
var path = require('path');
var fs = require('fs');

const DIR = path.join(__dirname, '/public/upload/profile_avatar/');
if (!fs.existsSync(DIR)){
    fs.mkdirSync(DIR);
}

// File uploading
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage
});

module.exports = upload;
