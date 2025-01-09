import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {

    let token = req.cookies.token;

    if (!token) return res.json({
        success: false,
        message: 'You dont have token'
    });

    let decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.id;

    next();
}