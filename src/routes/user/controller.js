const { User } = require('../../models');
const { BAD_REQUEST, UNAUTHORIZED, NOT_FOUND} = require('../../lib/error-message');

const auth = (req, res, next) => {
    try {
        return res.status(200).json({
            _id: req.user._id,
            isAdmin: req.user.role === 0 ? false: true,
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            lastName: req.user.lastName,
            role: req.user.role,
            image: req.user.image
        });
    } catch(err) {
        return next(err);
    }
};

const register = (req, res, next) => {
    try {
        const {email, name, lastName, password} = req.body;
        if(!email || !name || !lastName || !password 
            || name.length > 50 
            || password.length < 5 
            || lastName.length > 50) throw new Error(BAD_REQUEST);
            
        const user = new User(req.body);
        user.save((err, doc) => {
            if(err) return next(err);
            return res.status(200).json({registerSuccess: true})
        });
    } catch(err) {
        return next(err);
    }
    
};

const logIn = (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) throw new Error(BAD_REQUEST);

        User.findOne({email}, (err, userInfo) => {
            if(err) return next(err);
            if(!userInfo) return next(new Error(NOT_FOUND));

            userInfo.comparePassword(req.body.password, (err, isMatch) => {
                if(err) return next(err);
                if(!isMatch) return next(new Error(UNAUTHORIZED));

                userInfo.generateToken((err, user) => {
                    if(err) return next(err);
                    return res.cookie("x_auth", user.token).status(200).json({
                        loginSuccess: true,
                        userId: user._id,
                        userToken: user.token,
                    });
                });
            });
        });
    } catch(err) {
        return next(err);
    }
};

const logOut = async (req, res, next) => {
    try {
        const { _id } = req.user;
        User.findOneAndUpdate({_id}, {token: ""}, (err, user) => {
            if(err) return next(err);
            return res.status(200).send({logoutSuccess: true});
        });
    } catch(err) {
        return next(err);
    }
};

module.exports = {
    auth, register, logIn, logOut,
};