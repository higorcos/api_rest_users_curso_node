const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET_JWT;

module.exports = function(req,res,next){
    const authToken = req.headers['authorization'];


    if (!authToken) {
        return res.status(401).json({ error: 'Unauthorized: Token not provided' });
    }
    
    const token = authToken.split(' ')[1]; // O token JWT após 'Bearer '
    

    try {
      const decoded = jwt.verify(token, secret);
        if(decoded.role == 1){
            next();
        }else{
            return res.status(401).json({ error: 'Sem autorização' });
        }

    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}