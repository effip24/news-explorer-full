// middleware/auth.js
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/constants");
const UnauthorizeError = require("../utils/errors/UnauthorizeError");
const { authorizationMssg } = require("../utils/constants");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizeError(authorizationMssg);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    throw new UnauthorizeError(authorizationMssg);
  }

  req.user = payload;

  return next();
};
