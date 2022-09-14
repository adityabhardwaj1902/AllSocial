const User = require("../models/user");
module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (user) {
        return res.render("user", {
          title: "User Profile",
          user: user,
        });
      }
      return res.redirect("/users/signIn");
    });
  } else {
    return res.redirect("/users/signIn");
  }
};

//render the sign up page
module.exports.signUp = function (req, res) {
  return res.render("user_signup", {
    title: "AllSocial | Sign Up",
  });
};

//render the sign in page

module.exports.signIn = function (req, res) {
  return res.render("user_signin", {
    title: "AllSocial | Sign In",
  });
};

//get the sign up data

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }

        return res.redirect("/users/signIn");
      });
    } else {
      return res.redirect("back");
    }
  });
};

//sign in and create the session for the user

module.exports.createSession = function (req, res) {
  //find the user
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing in");
      return;
    }
    //handle user found
    if (user) {
      //handle password which don't match
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      // handle session creation
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    }
    // handle user not found
    else {
      return res.redirect("back");
    }
  });
};
