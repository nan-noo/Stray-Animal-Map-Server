const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
});

const uploadImageMulter = multer({
    storage,
    limits: { fileSize: 1000 * 1000 * 10 },
}).single('file');

module.exports = uploadImageMulter;