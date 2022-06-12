"use strict";

var dbFuncs = require("../DAL/dbFuncs");

function postRegistryBAL(registry) {
  return new Promise(function (resolve, reject) {
    console.log(registry);

    try {
      var db = new dbFuncs();
      db.postRegistry(registry).then(function (data) {
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = postRegistryBAL;