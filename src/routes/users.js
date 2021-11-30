const express = require('express');
const router = express.Router();

const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false: true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        role: req.user.role,
        image: req.user.image
    });
})

router.post('/register', (req, res) => {
    // register user info to DB
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({registerSuccess: false, err})
        return res.status(200).json({registerSuccess: true})
    });
});

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, userInfo) => {
        if(!userInfo){
            return res.json({
                loginSuccess: false,
                message: "일치하는 e-mail이 없습니다."
            });
        }
        userInfo.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({
                loginSuccess: false, 
                message: "잘못된 비밀번호입니다."
            });
            userInfo.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                // 쿠키에 토큰 저장
                res.cookie("x_auth", user.token).status(200).json({
                    loginSuccess: true,
                    userId: user._id
                })
            })
        })
        
    })
})

router.post('/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user) => {
        if(err) return res.json({logoutSuccess: false, err});
        return res.status(200).send({logoutSuccess: true});
    })
})

module.exports = router;