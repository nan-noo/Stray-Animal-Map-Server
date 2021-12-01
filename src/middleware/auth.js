const { User } = require('../models');

const auth = (req, res, next) => {
    try {
        const token = req.body.x_auth;
        if(!token) throw new Error("UNAUTHORIZED");

        User.findByToken(token, (err, user) => {
            if(err) return next(err);
            if(!user) return res.json({
                isAuth: false, 
                error: true
            });

            req.token = token;
            req.user = user;
            next();
        });
    } catch(err) {
        return next(err);
    }
};

module.exports = { auth };