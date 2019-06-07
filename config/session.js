const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");

module.exports = function(app) {
  app.use(cookieParser(process.env.SESSION_SECRET));

  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET
    })
  );

  app.use(flash());
};
