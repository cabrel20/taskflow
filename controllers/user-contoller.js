exports.getHomepage = (req, res, next) => {
  res.render("homepage", {
    pageTitle: "Taskflow | Home",
    path: "/",
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.getDashboard = (req, res, next) => {
  res.render("user/dashboard", {
    pageTitle: "dashboard",
    path: "/user/dashboard",
    user: req.session.user,
    isLoggedIn: req.session.isLoggedIn,
  });
};
