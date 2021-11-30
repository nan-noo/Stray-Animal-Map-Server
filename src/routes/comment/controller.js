const { Comment } = require('../../models');

const writeComment = (req, res, next) => {
    try {
        const { content } = req.body;
        if(!content || content.length > 1000) throw new Error("BAD_REQUEST");

        const comment = new Comment(req.body);
        comment.save((err, comment) => {
            if(err) return next(err);

            Comment.find({_id: comment._id})
                .populate('writer')
                .exec((err, result) => {
                    if(err) return next(err);
                    return res.status(200).json({success: true, result});
                });
        });
    } catch(err) {
        return next(err);
    }
};

const getCommentList = (req, res, next) => {
    try {
        Comment.find({postId: req.params.postId})
            .populate('writer')
            .exec((err, result) => {
                if(err) return next(err);
                return res.status(200).json({success: true, result});
            });
    } catch(err) {
        return next(err);
    }
};

module.exports = {
    writeComment, getCommentList,
};