const express = require("express");
const passport = require("passport");

const router = express.Router();

const usersController = require("../controllers/users_controller");

router.get("/profile", passport.checkAuthentication, usersController.profile);
router.get("/signUp", usersController.signUp);
router.get("/signIn", usersController.signIn);

router.post("/create", usersController.create);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/signIn" }),
  usersController.createSession
);

router.get("/signOut", usersController.destroySession);
module.exports = router;
