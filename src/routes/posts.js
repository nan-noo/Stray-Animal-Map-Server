const express = require('express');
const multer = require('multer');
const router = express.Router();

const {auth} = require('../middleware/auth');

const { Post } = require('../models/Post');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
});

const uploadImageMulter = multer({storage}).single('file');

router.post('/post', auth, (req, res) => {
    const post = new Post(req.body);
    post.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    });
});

router.post('/image', auth, (req, res) => {
    uploadImageMulter(req, res, err => {
        err ? res.json({success: false, err}) : res.status(200).json({success: true, filePath: req.file.path});
    });
});

router.get('/posts', (req, res) => {
    Post.find()
        .exec((err, posts) => {
            if(err) return res.json({success: false, err})
            return res.status(200).json({success: true, posts})
        });
});

router.get('/post/:postId', (req, res) => {
    Post.findOne({_id: req.params.postId})
        .exec((err, post) => {
            if(err) return res.json({success: false, err})
            return res.status(200).json({success: true, post})
        });
});

module.exports = router;