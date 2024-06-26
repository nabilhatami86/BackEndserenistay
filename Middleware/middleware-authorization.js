const { getToken } = require ('../utils/getToken');
const jwt = require('../utils/jwt');

module.exports = (req, res, next) => {
    try{
        const token = getToken(req)
console.log(token)

        if(!token){ 
            return res.status(401).json({ message: 'You shall not pass!' })
        }

        const verifyToken = jwt.confirmJwt(token)
        if(!verifyToken)return res.status(403).json({error: false, message:'Invalid Token!'})

        req.user = verifyToken
        next()
    } catch (error) {
        next(error)
    }
}