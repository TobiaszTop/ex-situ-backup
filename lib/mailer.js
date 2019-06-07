"use strict";

const sg = require("@sendgrid/mail");
sg.setApiKey(process.env.SENDGRID_KEY);

exports = module.exports = Mail;

function Mail(subject = "", body = "") {
  this.subject = subject;
  this.body = body;
  return this;
}

Mail.prototype.send = function(to = "no-reply@example.com") {
  return new Promise((resolve, reject) => {
    sg.send({
      to: to,
      from: "support@be-cms.io",
      subject: this.subject,
      html: this.body
    })
      .then(() => resolve())
      .catch(error => reject(error));
  });
};
