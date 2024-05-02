const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getSignIn = (req, res, next) => {
  res.render("auth/signIn", {
    pageTitle: "Sign In",
    path: "/auth/new-session",
  });
};

exports.getSignUp = (req, res, next) => {
  res.render("auth/signUp", {
    pageTitle: "Sign Up",
    path: "/auth/signUp",
    existingUser: false,
  });
};

exports.postSignUp = async (req, res, next) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;

  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    bcrypt
      .hash(password, 12)
      .then((passwordCrypted) => {
        const user = new User({
          userName: userName,
          email: email,
          password: passwordCrypted,
        });
        return user.save();
      })
      .then((result) => {
        res.redirect("/auth/new-session");
      })
      .catch((err) => console.log(err));
  } else {
    res.render("auth/signUp", {
      pageTitle: "Sign Up",
      path: "/auth/signUp",
      existingUser: true,
    });
  }
};
