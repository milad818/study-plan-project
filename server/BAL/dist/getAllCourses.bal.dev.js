"use strict";

var dbFuncs = require("../DAL/dbFuncs");

function getAllCoursesBAL() {
  return new Promise(function (resolve, reject) {
    try {
      var db = new dbFuncs();
      db.getAllCourses().then(function (data) {
        resolve(data);
      })["catch"](function (err) {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
}

;
module.exports = getAllCoursesBAL;