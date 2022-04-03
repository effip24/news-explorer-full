const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");
const { validateUrl } = require("../utils/validateUrl");

router.get("/articles", getArticles);

router.post(
  "/articles",
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string(),
      title: Joi.string(),
      text: Joi.string(),
      date: Joi.string(),
      source: Joi.string(),
      link: Joi.string().custom(validateUrl),
      image: Joi.string().custom(validateUrl),
    }),
  }),
  createArticle,
);
router.delete(
  "/articles/:articleId",
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().length(24).hex(),
    }),
  }),
  deleteArticle,
);

module.exports = router;
