'use strict';

const Course = require("./Course.js")

const sqlite3 = require("sqlite3").verbose();
const crypto = require('crypto');
const { request } = require("http");

function dbfuncs() {
  this.db = new sqlite3.Database("./study.db");


  this.getUser = (email, password) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM user WHERE email=?"
      this.db.get(sql, [email], (err, row) => {
        if (err)
          reject(err);
        else if (row == undefined)
          resolve(false);
        else {
          const user = { id: row.id, username: row.email, name: row.name }
          crypto.scrypt(password, row.salt, 32, function (err, hashedPassword) {
            if (err) reject(err);
            if (crypto.timingSafeEqual(Buffer.from(row.password, 'hex'), hashedPassword)) {
              resolve(user);
            }
            else resolve(false);
          });
        }
      });
    });
  }

  this.getUserById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE id = ?';
      this.db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        }
        else if (row === undefined) {
          resolve({ error: 'User not found!' });
        }
        else {
          const user = { id: row.id, username: row.email, name: row.name };
          resolve(user);
        }
      });
    });
  };

  this.getAllCourses = () => {
    return new Promise((resolve, reject) => {
      try {
        const sql = "SELECT * FROM course";
        this.db.all(sql, [], (err, data) => {
          if (err) reject(err)
          else {
            data.map(course => course.incompatible = course.incompatible ? course.incompatible.split(",") : undefined);
            data.map(course => course.prepcourse = course.prepcourse ? course.prepcourse.split(",") : undefined);
          }
          resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // this.postPlan = (plan) => {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const sql = "INSERT INTO plan (minCredit, maxCredit, type, userID) VALUES (?, ?, ?, ?)";
  //       this.db.run(sql, [plan.minCredit, plan.maxCredit, plan.type, plan.userID], (err, row) => {
  //         if (err) reject(err);
  //         else resolve(row);
  //       });
  //     } catch (error) {
  //       reject(error);
  //     }
  //   })
  // };

  this.postPlan = (plan) => {
    console.log(plan);
    return new Promise((resolve, reject) => {
      try {
        const sql = "INSERT INTO plan (minCredit, maxCredit, type, userID) VALUES (?, ?, ?, ?)";
        this.db.run(sql, [plan.mincredit, plan.maxcredit, plan.type, plan.userid], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      } catch (error) {
        reject(error);
      }
    })
  };

  this.deletePlan = (planid) => {
    return new Promise((resolve, reject) => {
      try {
        const sql = "DELETE FROM plan WHERE planID=?";
        this.db.run(sql, [planid], (err, row) => {
          if (err) reject(err);
          else resolve(row)
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  // this.getPlan = (id) => {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const sql = "SELECT * FROM plan WHERE id = ?";
  //       this.db.get(sql, [id], (err, data) => {
  //         if (err) reject(err);
  //         else resolve(data);
  //       });
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // }

  this.getPlan = (userid) => {
    return new Promise((resolve, reject) => {
      try {
        const sql = "SELECT * FROM plan WHERE userID = ?";
        this.db.get(sql, [userid], (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  this.postRegistry = (ccode, pid) => {
    return new Promise((resolve, reject) => {
      try {
        const sql = "INSERT INTO enregistry (courseCode, planID) VALUES (?, ?)";
        this.db.run(sql, [ccode, pid], (err, row) => {
          if (err) reject(err)
          else resolve(row);
        });
      } catch (error) {
        reject(error)
      }
    });
  }

  // this.deleteRegistry = (id) => {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const sql = "DELETE FROM enregistry WHERE id=?";
  //       this.db.run(sql, [id], (err, row) => {
  //         if (err) reject(err);
  //         else resolve(row)
  //       });
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // };

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

  this.getAllRegisteries = () => {
    return new Promise((resolve, reject) => {
      try {
        const sql = "SELECT * FROM enregistry";
        this.db.all(sql, [], (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }


  this.getRegistryInfo = (userid) => {
    return new Promise(async (resolve, reject) => {
      try {
        const studyPlan = await this.getPlan(userid);
        if (!studyPlan) {
          resolve(undefined);
        }
        const planCourses = await this.getAllRegisteries();
        // // // const sql = "SELECT * FROM enregistry JOIN course ON course.code=enregistry.courseCode WHERE planID=?";
        // // const sqlPlan = "SELECT * FROM plan JOIN enregistry ON plan.id=enregistry.planID WHERE userID=?";
        // // // const sql = "SELECT * FROM course JOIN enregistry ON course.code=enregistry.courseCode JOIN plan ON plan.id=enregistry.planID WHERE planID=?";
        // // const sqlCourse = "SELECT * FROM enregistry JOIN course ON course.code=enregistry.courseCode WHERE userID=?";
        // this.db.get(sqlPlan, [userid], (err, dataPlan) => {
        const sql = "SELECT * FROM course JOIN enregistry on course.code=enregistry.courseCode WHERE planID=?"
        this.db.all(sql, [studyPlan.id], (err, registrydata) => {

          if (err) reject(err);
          else {
            // console.log(dataPlan);
            // console.log(dataCourses);
            // dataPlan.courses = dataCourses;
            const incomp = registrydata.incompatible ? x.incompatible.split(",") : [];
            const prep = registrydata.prepcourse ? x.prepcourse.split(",") : [];
            const plan = registrydata.map(x => new Course(x.code, x.name, x.credit, x.maxstudent, incomp, prep));
            studyPlan.courses = plan;
            resolve(studyPlan);
          }
        })
        // if (err) reject(err)
        // });
      } catch (error) {
        reject(error);
      }
    });
  };


  this.deleteRegistryInfo = (planid) => {
    return new Promise(async (resolve, reject) => {
      try {
        const ENREGsql = "DELETE FROM enregistry WHERE planID=?";
        await this.db.run(ENREGsql, [planid], (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
        const PLANsql = "DELETE FROM plan WHERE id=?";
        await this.db.get(PLANsql, [planid], (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  };


  this.postNewRegistry = (courses, userid) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(userid);
        console.log("in api", courses);
        const studyPlan = await this.getPlan(userid);
        if(!studyPlan) {
          resolve(undefined);
        }
        const REMOVEsql = "DELETE FROM enregistry WHERE planID=?";
        await this.db.run(REMOVEsql, [studyPlan.id], (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
        for(const i of courses) {
        await this.postRegistry(i.code, studyPlan.id);
        }
      } catch (error) {
        reject(error);
      }
    });
  };






};




module.exports = dbfuncs;