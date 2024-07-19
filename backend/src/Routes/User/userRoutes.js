const router = require("express").Router();

const { register, login } = require("../../Controller/User/userController");
const auth = require("../../Middleware/auth");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
