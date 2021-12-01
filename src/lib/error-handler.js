const { BAD_REQUEST, UNAUTHORIZED, NOT_FOUND } = require('./error-message');

const errorHandler = (err, req, res, next) => {
    switch (err.message) {
        case BAD_REQUEST:
            return res.json({success: false, message: "잘못된 요청 형식입니다."});
        case UNAUTHORIZED:
            return res.json({success: false, message: "잘못된 비밀번호입니다."});
        case NOT_FOUND:
            return res.json({success: false, message: "일치하는 e-mail이 없습니다."});
        default:
            if (process.env.MODE !== 'prod') console.error('\x1b[31m%s\x1b[0m', err);
            return res.json({success: false, message: err.message});
    }
};

module.exports = { errorHandler };
