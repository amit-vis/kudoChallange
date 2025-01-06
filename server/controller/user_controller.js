const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.create = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        let user = await User.findOne({email: email});
        if(user){
            return res.status(400).json({
                message: "User already exist",
                success: false
            })
        }
        user = await User.create({
            name: name,
            email: email,
            password: bcrypt.hashSync(password, 10)
        })

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            data: user
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in create the user",
            error: error.message
        })
    }
}

module.exports.signin = async (req, res)=>{
    try {
        const {email, password} = req.body;
        let user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({
                message: "User not exist",
                success: false
            })
        }
        if(bcrypt.compareSync(password, user.password)){
            const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {expiresIn: '1h'});
            return res.status(200).json({
                message: "User signin successfully",
                success: true,
                token: token
            })
        }else{
            return res.status(400).json({
                message: "Password not match",
                success: false
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in signing the user",
            error: error.message
        })
    }
}

module.exports.login = async (req, res)=>{
    try {
        const {name} = req.body;
        if(name.trim() === req.user.name.trim()){
            const user = await User.findById(req.user._id);
            return res.status(200).json({
                message: "User login successfully",
                success: true,
                data: user
            })
        }else{
            return res.status(400).json({
                message: "User not match",
                success: false
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in login the user",
            error: error.message
        })
    }
}

module.exports.getAll = async (req, res)=>{
    try {
        let userData = await User.find({_id: {$ne: req.user._id}});
        return res.status(200).json({
            message: "All users",
            success: true,
            data: userData
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in getting the users",
            error: error.message
        })
    }
}