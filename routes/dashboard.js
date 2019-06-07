const authorized = require("../middleware/authorize");

module.exports = function(app) {
  app.get("/", authorized, (req, res, next) => {
    res.render("dashboard", {});
  });
};
