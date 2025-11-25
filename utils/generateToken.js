const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

module.exports = generateToken;