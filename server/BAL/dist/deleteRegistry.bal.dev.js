"use strict";

var dbFuncs = require("../DAL/dbFuncs");

function deleteRegistryBAL(id) {
  return new Promise(function (resolve, reject) {
    try {
      var db = new dbFuncs();
      db.deleteRegistry(id).then(function (data) {
        resolve(data);
      })["catch"](function (err) {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = deleteRegistryBAL;