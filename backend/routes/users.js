const router = require("express").Router();
const { getUsers, getCurrentUser } = require("../controllers/users");

router.get("/users/me", getCurrentUser);
router.get("/users", getUsers);

module.exports = router;
