const dbfuncs = require("../DAL/dbFuncs");

function postPlanBAL(plan) {
  return new Promise((resolve, reject) => {
    try {
      const db = new dbfuncs();
      db.postPlan(plan)
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


module.exports = postPlanBAL;