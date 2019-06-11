module.exports = function(app) {
  app.get("/examples", (req, res, next) => {
    res.render("examples", { title:"Examples of Ex-situ" });
  });
};
