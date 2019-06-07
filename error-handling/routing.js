module.exports = function(app) {
  app.use((req, res) => {
    res.status(404);
    res.render("errorpage", {
      title: res.__("404: Not Found"),
      content: res.__(
        "The page you are looking for does not exist. This service is either temporarily unable to process your request or the link you clicked is broken. Please check back shortly."
      )
    });
  });

  app.use((error, req, res, next) => {
    res.status(500);
    res.render("errorpage", {
      title: res.__("500: Internal Server Error"),
      content: res.__(
        "Something went wrong on the server. The error has been logged."
      )
    });
    next(error);
  });
};
