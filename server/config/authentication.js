const jwt = require('jsonwebtoken');

module.exports.verifyToken = async (req, res, next)=>{
    try {
        const authHeader = req.headers['authorization'];
        let token = authHeader && authHeader.split(' ')[1];
        if(!token){
            return res.status(400).json({
                message: "No token provided"
            })
        }
        jwt.verify(token, process.env.secret_key, (err, user)=>{
            if(err){
                return res.status(401).json({
                    message: "token is invalid or expire"
                })
            }
            req.user = user
        })
        next()
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in authenticating the user!",
            success: false
        })
    }
}