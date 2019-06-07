const Query = require("../lib/queries");
const User = new Query("users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Mail = require("../lib/mailer");

module.exports = function(app) {
  app.get("/signup", (req, res, next) => {
    try {
      res.render("signup", { title: "Opret konto" });
    } catch (error) {
      next(error);
    }
  });

  app.post("/signup", async (req, res, next) => {
    try {
      const salt = await bcrypt.genSalt(15);
      const hash = await bcrypt.hash(req.fields.password, salt);
      const user = await User.create({
        email: req.fields.email,
        secret: hash
      });
      const token = await jwt.sign(
        { data: req.fields.email },
        process.env.TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      const activationMail = new Mail(
        "Please verify your email address",
        `<p><a href="http://localhost:3030/verify/${
          user.insertId
        }/${token}">Click here to verify</a></p>`
      );
      await activationMail.send(req.fields.email);
      res.redirect(`/verify/${user.insertId}`);
    } catch (error) {
      if (error.code !== "ER_DUP_ENTRY") return next(error);
      req.flash(
        "error",
        `The email ${
          req.fields.email
        } is already registered. Please use another.`
      );
      return res.redirect("/signup");
    }
  });
};
