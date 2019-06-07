const Query = require("../lib/queries");
const users = new Query("users");
const bcrypt = require("bcrypt");

module.exports = function(app) {
  app.post("/auth/signin", async (req, res, next) => {
    try {
      const result = await users.findOne({ email: req.fields.email });
      if (result.length !== 1) {
        req.flash("error", "Invalid username or password");
        return res.redirect("/signin");
      }

      if (bcrypt.compareSync(req.fields.password, result[0].secret)) {
        if (!result[0].active) return res.redirect(`/verify/${result[0].id}`);

        req.session.user = result[0].id;
        res.redirect("/");
      } else {
        req.flash("error", "Invalid username or password");
        return res.redirect("/signin");
      }
    } catch (err) {
      next(err);
    }
  });

  app.get("/auth/signout", (req, res, next) => {
    req.session.user = null;
    res.redirect("/");
  });
};
