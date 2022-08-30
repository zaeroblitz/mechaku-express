const jwt = require("jsonwebtoken");

const authJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "SECRET", (err, user) => {
      if (err) {
        return res.status(403).send({
          message: err.message,
        });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).send({
      message: "Please login first",
    });
  }
};

module.exports = authJwt;
