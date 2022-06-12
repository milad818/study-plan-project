"use strict";

var sqlite3 = require("sqlite3").verbose();

function dbfuncs() {
  var _this = this;

  this.db = new sqlite3.Database("./study.db");

  this.getAllCourses = function () {
    return new Promise(function (resolve, reject) {
      try {
        var sql = "SELECT * FROM course";

        _this.db.all(sql, [], function (err, data) {
          if (err) reject(err);else resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.postPlan = function (plan) {
    return new Promise(function (resolve, reject) {
      try {
        var sql = "INSERT INTO plan (minCredit, maxCredit, type, userID) VALUES (?, ?, ?, ?)";

        _this.db.run(sql, [plan.minCredit, plan.maxCredit, plan.type, plan.userID], function (err, row) {
          if (err) reject(err);else resolve(row);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.deletePlan = function (id) {
    return new Promise(function (resolve, reject) {
      try {
        var sql = "DELETE FROM plan WHERE id=?";

        _this.db.run(sql, [id], function (err, row) {
          if (err) reject(err);else resolve(row);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.getPlan = function (id) {
    return new Promise(function (resolve, reject) {
      try {
        var sql = "SELECT * FROM plan WHERE id = ?";

        _this.db.get(sql, [id], function (err, data) {
          if (err) reject(err);else resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.postRegistry = function (registry) {
    return new Promise(function (resolve, reject) {
      try {
        var sql = "INSERT INTO enregistry (courseCode, planID) VALUES (?, ?)";

        _this.db.run(sql, [registry.coursecode, registry.planid], function (err, row) {
          if (err) reject(err);else resolve(row);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.deleteRegistry = function (id) {
    return new Promise(function (resolve, reject) {
      try {
        var sql = "DELETE FROM enregistry WHERE id=?";

        _this.db.run(sql, [id], function (err, row) {
          if (err) reject(err);else resolve(row);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.getRegistryInfo = function (planid) {
    return new Promise(function (resolve, reject) {
      try {
        // const sql = "SELECT * FROM enregistry JOIN course ON course.code=enregistry.courseCode WHERE planID=?";
        var sqlPlan = "SELECT * FROM plan JOIN enregistry ON plan.id=enregistry.planID WHERE planID=?"; // const sql = "SELECT * FROM course JOIN enregistry ON course.code=enregistry.courseCode JOIN plan ON plan.id=enregistry.planID WHERE planID=?";

        var sqlCourse = "SELECT * FROM enregistry JOIN course ON course.code=enregistry.courseCode WHERE planID=?";

        _this.db.get(sqlPlan, [planid], function (err, dataPlan) {
          _this.db.all(sqlCourse, [planid], function (err, dataCourses) {
            if (err) reject(err);else {
              // console.log(dataPlan);
              // console.log(dataCourses);
              dataPlan.courses = dataCourses;
              resolve(dataPlan);
            }
          });

          if (err) reject(err);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.deleteRegistry = function (planid) {
    return new Promise(function (resolve, reject) {
      try {
        var sql = "DELETE FROM enregistry WHERE planID=?";

        _this.db.run(sql, [planid], function (err, data) {
          if (err) reject(err);else resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  };
}

;
module.exports = dbfuncs;