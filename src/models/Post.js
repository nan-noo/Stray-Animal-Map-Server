const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50,
    },
    content: {
        type: String,
        maxlength: 2000,
    },
    img: String,
    type: String,
    animal_type: String,
    location: String,
    latLng: {
        type: Object,
    },
    contact: String,
}, { timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = {Post};