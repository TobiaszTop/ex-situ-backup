module.exports = function(app) {
  app.get("/", (req, res, next) => {
    res.render("frontpage", {}); //normally dashboard
  });
};
