"use strict";

var dbFuncs = require("../DAL/dbFuncs");

function getRegistryBAL(planid) {
  return new Promise(function (resolve, reject) {
    try {
      var db = new dbFuncs();
      db.getRegistryInfo(planid).then(function (data) {
        resolve(data);
      })["catch"](function (err) {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = getRegistryBAL;