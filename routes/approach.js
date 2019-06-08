module.exports = function(app) {
  app.get("/approach", (req, res, next) => {
    res.render("approach", {});
  });
};
