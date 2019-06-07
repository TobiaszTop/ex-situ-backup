const jwt = require("jsonwebtoken");
const Query = require("../lib/queries");
const User = new Query("users");

module.exports = function(app) {
  app.get("/verify/:id", async (req, res, next) => {
    try {
      const user = await User.findOne({ id: req.params.id, active: 0 });
      if (user.length !== 1) return next();

      res.render("verify_waiting", {
        title: "Velkommen",
        email: user[0].email
      });
    } catch (error) {
      next(error);
    }
  });

  app.get("/verify/:id/:token", (req, res, next) => {
    jwt.verify(
      req.params.token,
      process.env.TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return next(err);

        try {
          const user = await User.findOne({
            id: req.params.id,
            email: decoded.data,
            active: 0
          });

          if (user.length !== 1)
            return res.render("verify_error", { title: "Fejl" });

          const result = await User.findByIdAndUpdate(user[0].id, {
            active: 1
          });

          if (result.affectedRows === 1 && result.changedRows === 1) {
            res.render("verify_success", { title: "Velkommen" });
          }
        } catch (error) {
          next(error);
        }
      }
    );
  });
};
