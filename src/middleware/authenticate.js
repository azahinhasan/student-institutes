const jwt = require("jsonwebtoken");

module.exports = function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next();

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } catch (err) {
    console.warn("JWT invalid or expired");
  }

  next();
};
