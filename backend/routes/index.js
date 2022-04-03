const router = require("express").Router();

const { celebrate, Joi } = require("celebrate");
const { errors } = require("celebrate");

const auth = require("../middleware/auth");
const articles = require("./articles");
const users = require("./users");
const { login, createUser } = require("../controllers/users");

const { requestLogger, errorLogger } = require("../middleware/Logger");

const NotFoundError = require("../utils/errors/NotFoundError");

router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);
router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  createUser,
);

router.use(requestLogger);

// protecting articles and useres
router.use(auth);
router.use("/", articles);
router.use("/", users);

router.get("*", (req, res, next) => {
  next(new NotFoundError("requested resource not found"));
});

router.use(errorLogger);
router.use(errors());
router.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
});

module.exports = router;
