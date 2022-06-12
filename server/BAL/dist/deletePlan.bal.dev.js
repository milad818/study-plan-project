"use strict";

var dbFuncs = require("../DAL/dbFuncs");

function deletePlanBAL(id) {
  return new Promise(function (resolve, reject) {
    try {
      var db = new dbFuncs();
      db.deletePlan(id).then(function (data) {
        resolve(data);
      })["catch"](function (err) {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = deletePlanBAL;