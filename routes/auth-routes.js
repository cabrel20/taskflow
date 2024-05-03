const express = require("express");
const authController = require("../controllers/auth-controller");

const router = express.Router();

router.get("/new-session", authController.getSignIn);
router.get("/sign-up", authController.getSignUp);
router.post("/sign-up", authController.postSignUp);
router.post("/new-session", authController.postSignIn);
router.post("/logout", authController.postLogout);

module.exports = router;
