module.exports = function(app) {
  app.get("/signin", (req, res, next) => {
    res.render("frontpage", { title: "Bowser's dog dick revenge III" }); //signin Log ind
  });
};
