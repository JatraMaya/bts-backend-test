const { verify} = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET || 'supersecret'

const userVerify = (req, res, next) => {
    const {authorization} = req.headers;
    if(authorization){
        const token = authorization.split(" ")[1]
        try{
const payload = verify(token, SECRET)
            req.user = payload
            next()
        }catch(e){
            res.status(401).send("Token expired, please re-login")
        }
    }else{
        res.status(401).send("User Unauthorized")
    }
}

module.exports = userVerify
