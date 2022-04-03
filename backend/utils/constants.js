const { NODE_ENV, JWT_SECRET, MONGO_ADDRESS } = process.env;
const rateLimit = require("express-rate-limit");

module.exports.MONGODB_ADDRESS = NODE_ENV === "production" ? MONGO_ADDRESS : "mongodb://localhost:27017/newsdb";

module.exports.SECRET = NODE_ENV === "production" ? JWT_SECRET : "dev-secret";

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports.userNotFoundMssg = "No user was found with the given id";

module.exports.emailExistsMssg = "Email already exists";

module.exports.articleNotFoundMssg = "No Article was found with the given id";

module.exports.forbiddenMssg = "forbidden request";

module.exports.authorizationMssg = "Authorization Required";
