const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getSignIn = (req, res, next) => {
  res.render("auth/signIn", {
    pageTitle: "Sign In",
    path: "/auth/signIn",
    isMatch: true,
    isLoggedIn: false,
  });
};

exports.getSignUp = (req, res, next) => {
  res.render("auth/signUp", {
    pageTitle: "Sign Up",
    path: "/auth/signUp",
    existingUser: false,
    isLoggedIn: false,
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
    res.redirect("/auth/sign-up");
  }
};

exports.postSignIn = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const findingUser = await User.findOne({ email: email });

  if (!findingUser) {
    return res.redirect("/auth/sign-up");
  } else {
    bcrypt
      .compare(password, findingUser.password)
      .then((doMatch) => {
        if (doMatch) {
          req.session.user = findingUser;
          req.session.isLoggedIn = true;

          req.session.save((err) => {
            console.log(err);
            return res.redirect("/dashboard");
          });
        } else {
          res.redirect("/auth/new-session");
        }
      })
      .catch((err) => console.log(err));
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
