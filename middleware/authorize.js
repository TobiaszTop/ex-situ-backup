"use strict";

const Query = require("../lib/queries");
const User = new Query("users");
const bcrypt = require("bcrypt");

exports = module.exports = authorized;

async function authorized(req, res, next) {
  if (!req.session.user) return res.redirect("/signin");
  next();
}
