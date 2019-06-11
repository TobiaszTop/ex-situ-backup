module.exports = function(app) {
  app.get("/method", (req, res, next) => {
    res.render("method", { title:"The Ex-situ approach" });
  });
};
