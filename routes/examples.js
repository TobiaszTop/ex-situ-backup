module.exports = function(app) {
  app.get("/examples", (req, res, next) => {
    res.render("examples", { title:"Ex-situ use examples" });
  });
};
