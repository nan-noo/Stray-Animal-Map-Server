const { Post } = require('../../models');
const { BAD_REQUEST, } = require('../../lib/error-message');

const uploadImageMulter = require('../../lib/multer');

const uploadPost = (req, res, next) => {
    try {
        const { title, type, animal_type:animalType, location, latLng, content} = req.body;
        if(!title || !type || !animalType || !location || !latLng 
            || title.length > 50 
            || content.length > 2000) throw new Error(BAD_REQUEST);

        const post = new Post(req.body);
        post.save((err, doc) => {
            if(err) return next(err);
            return res.status(200).json({success: true})
        });
    } catch(err) {
        return next(err);
    }
};

const uploadImage = (req, res, next) => {
    try {
        uploadImageMulter(req, res, err => {
            if(err) return next(err);
            return res.status(200).json({success: true, filePath: req.file.location});
        });
    } catch(err) {
        return next(err);
    }
};

const getPostList = (req, res, next) => {
    try {
        Post.find()
            .exec((err, posts) => {
                if(err) return next(err);
                return res.status(200).json({success: true, posts})
            });
    } catch(err) {
        return next(err);
    }
};

const getOnePost = (req, res, next) => {
    try {
        Post.findOne({_id: req.params.postId})
            .exec((err, post) => {
                if(err) return next(err);
                return res.status(200).json({success: true, post})
            });
    } catch(err) {
        return next(err);
    }
};

module.exports = {
    uploadPost, uploadImage,
    getOnePost, getPostList,
};