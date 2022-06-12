const dbFuncs = require("../DAL/dbFuncs");


function deletePlanBAL(id) {
  return new Promise((resolve, reject) => {
    try {
      const db = new dbFuncs();
      db.deletePlan(id)
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
}

module.exports = deletePlanBAL;