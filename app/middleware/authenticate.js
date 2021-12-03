const jwt = require('jsonwebtoken');
const config = require("./../config/config.json");
const { TokenExpiredError } = jwt;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).send({ message: "No token provided!" });
    }
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.accessSecretToken, (err, user) => {
            if (err) {
                 return catchError(err, res);
            }

            req.user = user;
            next();
        });
    } else {
        return catchError(err, res);
    }
};

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Access Token has expired! Access Denied" });
  }

  return res.status(401).send({ message: "Unauthorized! Access Denied" });
}

module.exports = authenticateToken;