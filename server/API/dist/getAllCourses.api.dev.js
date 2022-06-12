"use strict";

var getAllCoursesBAL = require("../BAL/getAllCourses.bal");

function getAllCoursesAPI() {
  app.get("/api/courses", function (req, res) {
    getAllCoursesBAL().then(function (result) {
      res.json(result);
    })["catch"](function (err) {
      res.status(500).json(err);
    });
  });
}

module.exports = getAllCoursesAPI;