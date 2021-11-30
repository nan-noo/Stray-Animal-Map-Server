const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastName: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.pre('save', function(next){
    let user = this;

    if(user.isModified('password')){
        // encrypt password
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    }
    else next();
})

userSchema.methods.comparePassword = function(plainPassword, callback){
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => { // compare user input & DB data
        if(err) return callback(err);
        callback(null, isMatch);
    })
};

userSchema.methods.generateToken = function(callback) { // (err, user)
    let user = this;

    // create token using jsonwebtoken
    let token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET);

    user.token = token;
    user.save((err, doc) => {
        if(err) return callback(err);
        callback(null, user);
    })
    
}

userSchema.statics.findByToken = function(token, callback){
    let user = this;

    // decode token -> get decoded id
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // compare client token & token in DB
        user.findOne({"_id": decoded, "token": token}, (err, user) => {
            if(err) return callback(err);
            callback(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = {User};