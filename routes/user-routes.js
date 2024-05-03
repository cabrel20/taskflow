const express = require("express");
const userController = require("../controllers/user-contoller");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", userController.getHomepage);
router.get("/dashboard", isAuth, userController.getDashboard);

module.exports = router;
