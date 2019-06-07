const authorized = require("../middleware/authorize");
const Query = require("../lib/queries");
const User = new Query("users");
const UserRoles = new Query("view_userroles");

module.exports = function(app) {
  app.get("/users", authorized, async (req, res, next) => {
    try {
      const users = await User.find();
      res.render("users_list", { users });
    } catch (error) {
      next(error);
    }
  });

  app.get("/users/:id", authorized, async (req, res, next) => {
    try {
      const user = await User.findOne({ id: req.params.id });
      const roles = await UserRoles.find({ user_id: req.params.id });

      if (user.length !== 1) return next();
      res.render("users_edit", { user: user[0], roles });
    } catch (error) {
      next(error);
    }
  });

  app.patch("/users/:id", authorized, async (req, res, next) => {
    try {
      const result = await User.findByIdAndUpdate();
    } catch (error) {
      next(error);
    }
  });
};
