const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const accessTokenSecret = 'CFSAT2021';
    const token = req.headers.authorization?req.headers.authorization.split(" ")[1]:null;
    if (!token) {
        res.status(401).json({
            message: 'Auth failed'
        });
    } else {
        jwt.verify(token, accessTokenSecret, (err, decoded) => {

        if (err) {
            res.status(401).json({
                message: 'Auth failed'
            });
        } else {
            req.body.user_Id = decoded.id;
            next()
        }
        })
    }
}