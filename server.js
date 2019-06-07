const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const pjson = require("./package.json");

require("./config/index")(app);
require("./routes/index")(app);
require("./error-handling/index")(app);

app.listen(port, error => {
  if (error) {
    console.error(error);
    return;
  }
  console.info(
    `${pjson.name} v${pjson.version} is running on http://localhost:${port}`
  );
});
