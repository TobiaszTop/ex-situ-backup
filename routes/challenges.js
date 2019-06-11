module.exports = function(app) {
  app.get("/challenges", (req, res, next) => {
    res.render("challenges", { title:"Problems and challenges" });
  });
};
