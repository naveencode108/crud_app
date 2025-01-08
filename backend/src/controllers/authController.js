import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) return res.json({
            success: false,
            message: 'email and password is incorrect'
        })

        let comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) return res.json({
            success: false,
            message: 'email and password is incorrect'
        })

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1w' })

        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 }).json({
            success: true,
            token: token,
            message: 'User Logged In'
        });

    }
    catch (er) {
        return res.json({ success: false, message: er.message });
    }
}

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "field required"
            })
        }

        let user = await userModel.findOne({ email });

        if (user) return res.json({
            success: false,
            message: 'User exist'
        })

        let hashPass = await bcrypt.hash(password, 10);

        let createUser = await userModel.create({
            name,
            email,
            password: hashPass
        })

        if(!createUser) return res.status(400).json({
           success:false,
           message:'User not created'
        })


        return res.json({
            success: true,
            message: 'User created successfully'
        })



    } catch (er) {
        return res.json({
            success: false,
            message: er.message
        })
    }
}

export const logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({
    success:true,
    message:'Logged out successfully'
  })
}