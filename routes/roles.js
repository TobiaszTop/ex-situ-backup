const Query = require("../lib/queries");
const Role = new Query("roles");
const User = new Query("users");
const userRole = new Query("users_roles");
const authorized = require("../middleware/authorize");

module.exports = function(app) {
  app.get("/api/roles", authorized, async (req, res, next) => {
    try {
      const roles = await Role.find();
      res.json(roles);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/roles/:id", authorized, async (req, res, next) => {
    try {
      const role = await Role.findOne({ id: req.params.id });
      if (role.length !== 1) return next();
      res.json(role[0]);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/roles/:id/users", authorized, async (req, res, next) => {
    try {
      const role = await Role.find({ id: req.params.id });
      const usersWithRole = await userRole.find({ roles_id: req.params.id });
    } catch (error) {
      next(error);
    }
  });
};
