const i18n = require("../middleware/i18n");
module.exports = function(app) {
  app.use(i18n);
};
