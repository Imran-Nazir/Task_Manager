const jwt = require('jsonwebtoken');

module.exports=(req, res, next)=>{
    let token = req.headers['token-key'];
    jwt.verify(token, "secrateKey1234", (err, decode)=>{
        if(err){
            res.status(401).json({data: 'Unauthorized!'})
        }
        else{
            let email = decode['data'];
            console.log(email);
            req.headers.email = email;
            next();
        }
    })
}
