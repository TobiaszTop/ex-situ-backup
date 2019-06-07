const fs = require("fs");
const path = require("path");

module.exports = function(app) {
  fs.readdirSync(__dirname, { withFileTypes: true }).forEach(file => {
    if (file.name !== path.basename(__filename)) {
      try {
        require(path.join(__dirname, file.name))(app);
      } catch (error) {
        console.error(error);
      }
    }
  });
};
