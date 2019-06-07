const i18n = require("i18n");

i18n.configure({
  locales: ["en", "da"],
  directory: "./locales",
  defaultLocale: "en",
  cookie: "lang"
});

module.exports = function(req, res, next) {
  i18n.init(req, res);

  const current_locale = i18n.getLocale();
  return next();
};
