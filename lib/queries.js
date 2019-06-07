"use strict";

const mysql = require("../config/mysql")();

function extrapolate(object) {
  const keys = [];
  const values = [];

  for (let i in object) {
    keys.push(`${i} = ?`);
    values.push(object[i]);
  }

  return { keys, values };
}
const execute = (SQL, values = []) =>
  new Promise((resolve, reject) => {
    mysql.query(SQL, values, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

exports = module.exports = Query;

/**
 * Create a query
 * @param {String} table name of table
 */
function Query(table) {
  this.table = table;
  return this;
}

Query.prototype.find = function(conditions = { 1: 1 }) {
  const { keys, values } = extrapolate(conditions);
  this.SQL = `SELECT * FROM ${this.table}`;
  if (keys) this.SQL += ` WHERE ${keys.join(" AND ")}`;

  return execute(this.SQL, values);
};

Query.prototype.findOne = function(conditions = { 1: 1 }) {
  const { keys, values } = extrapolate(conditions);
  this.SQL = `SELECT * FROM ${this.table} WHERE ${keys.join(" AND ")}`;

  return execute(this.SQL, values);
};

Query.prototype.findByIdAndUpdate = function(id, conditions = { 1: 1 }) {
  const { keys, values } = extrapolate(conditions);
  this.SQL = `UPDATE ${this.table} SET ${keys.join(", ")} WHERE id = ${id}`;

  return execute(this.SQL, values);
};

Query.prototype.create = function(conditions = {}) {
  const { keys, values } = extrapolate(conditions);
  this.SQL = `INSERT INTO ${this.table} SET ${keys.join(", ")}`;

  return execute(this.SQL, values);
};
