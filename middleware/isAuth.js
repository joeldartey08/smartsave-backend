const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (req.method === "OPTIONS") {
      return next();
    }

    if (!authHeader) {
      res.code = 401;

      throw new Error("Authorization header missing");
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      res.code = 401;

      throw new Error("token missing");
    }

    const decode = jwt.verify(token, process.env.JWT_KEY);

    req.user = decode;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAuth;
