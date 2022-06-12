const sqlite3 = require("sqlite3").verbose();


function dbfuncs() {
  this.db = new sqlite3.Database("./study.db");


  this.getAllCourses = () => {
    return new Promise((resolve, reject) => {
      try {
        const sql = "SELECT * FROM course";
        this.db.all(sql, [], (err, data) => {
          if(err) reject(err)
          else resolve(data);
        });
      } catch(error) {
        reject(error);
      }
    });
  }

  this.postPlan = (plan) => {
    return new Promise((resolve, reject) => {
      try {
        const sql = "INSERT INTO plan (minCredit, maxCredit, type, userID) VALUES (?, ?, ?, ?)";
        this.db.run(sql, [plan.minCredit, plan.maxCredit, plan.type, plan.userID], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      } catch (error) {
        reject(error);
      }
    })
  };

  this.deletePlan = (id) => {
    return new Promise((resolve, reject) => {
      try {
        const sql = "DELETE FROM plan WHERE id=?";
        this.db.run(sql, [id], (err, row) => {
          if (err) reject(err);
          else resolve(row)
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.getPlan = (id) => {
    return new Promise((resolve, reject) => {
      try {
        const sql = "SELECT * FROM plan WHERE id = ?";
        this.db.get(sql, [id], (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  this.postRegistry = (registry) => {
    return new Promise((resolve, reject) => {
      try {
        const sql = "INSERT INTO enregistry (courseCode, planID) VALUES (?, ?)";
        this.db.run(sql, [registry.coursecode, registry.planid], (err, row) => {
          if (err) reject(err)
          else resolve(row);
        });
      } catch (error) {
        reject(error)
      }
    });
  }

  this.deleteRegistry = (id) => {
    return new Promise((resolve, reject) => {
      try {
        const sql = "DELETE FROM enregistry WHERE id=?";
        this.db.run(sql, [id], (err, row) => {
          if (err) reject(err);
          else resolve(row)
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.getRegistryInfo = (planid) => {
    return new Promise((resolve, reject) => {
      try {
        // const sql = "SELECT * FROM enregistry JOIN course ON course.code=enregistry.courseCode WHERE planID=?";
        const sqlPlan = "SELECT * FROM plan JOIN enregistry ON plan.id=enregistry.planID WHERE planID=?";
        // const sql = "SELECT * FROM course JOIN enregistry ON course.code=enregistry.courseCode JOIN plan ON plan.id=enregistry.planID WHERE planID=?";
        const sqlCourse = "SELECT * FROM enregistry JOIN course ON course.code=enregistry.courseCode WHERE planID=?";
        this.db.get(sqlPlan, [planid], (err, dataPlan) => {
          this.db.all(sqlCourse, [planid], (err, dataCourses) => {

            if (err) reject(err)
            else {
              // console.log(dataPlan);
              // console.log(dataCourses);
              dataPlan.courses = dataCourses;
              resolve(dataPlan);
            }
          })
          if (err) reject(err)
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.deleteRegistry = (planid) => {
    return new Promise((resolve, reject) => {
      try {
        const sql = "DELETE FROM enregistry WHERE planID=?";
        this.db.run(sql, [planid], (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  };





};




module.exports = dbfuncs;