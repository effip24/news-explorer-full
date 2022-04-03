const Article = require("../models/article");
const NotFoundError = require("../utils/errors/NotFoundError");
const BadRequest = require("../utils/errors/BadRequest");
const { articleNotFoundMssg, forbiddenMssg } = require("../utils/constants");

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .populate("owner")
    .then((article) => res.status(200).send(article))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(200).send(article))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findOneAndRemove({ _id: req.params.articleId })
    .then((deletedArticle) => {
      if (!deletedArticle) {
        throw new NotFoundError(articleNotFoundMssg);
      } else if (deletedArticle.owner._id.toString() !== req.user._id) {
        throw new BadRequest(forbiddenMssg);
      }
      res.status(200).send(deletedArticle);
    })
    .catch(next);
};
