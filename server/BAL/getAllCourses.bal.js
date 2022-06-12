const dbFuncs = require("../DAL/dbFuncs")


function getAllCoursesBAL() {
  return new Promise((resolve, reject) => {
    try {
      const db = new dbFuncs();
      db.getAllCourses()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    } catch(error) {
      reject(error);
    }
  });
};


module.exports = getAllCoursesBAL;