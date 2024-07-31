const express = require("express");

const UserController = require("../../controllers/user-controller");
const { AuthValidator } = require("../../middlewares/index");

const router = express.Router();

router.post("/signup", UserController.createUser);
router.post("/signin", AuthValidator.validateUserSignup, UserController.signin);

router.get("/isAuthenticated", UserController.isAuthenticated);

router.get("/isAdmin", AuthValidator.validateIsAdmin, UserController.isAdmin);

module.exports = router;
