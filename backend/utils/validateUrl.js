const validator = require("validator");
const BadRequest = require("./errors/BadRequest");

module.exports.validateUrl = (url) => {
  if (validator.isURL(url)) {
    return url;
  }
  throw new BadRequest("please enter a valid URL");
};
