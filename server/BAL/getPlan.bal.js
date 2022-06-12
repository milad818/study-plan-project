const dbFuncs = require("../DAL/dbFuncs");

function getPlanBAL(id) {
  return new Promise((resolve, reject) => {
    try{
      const db = new dbFuncs();
      db.getPlan(id)
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

module.exports = getPlanBAL;