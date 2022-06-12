const dbFuncs = require("../DAL/dbFuncs");


function getRegistryInfoBAL(planid) {
  return new Promise((resolve, reject) => {
    try {
      const db = new dbFuncs();
      db.getRegistryInfo(planid)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    } catch(error) {
      reject(error)
    }
  });
}


module.exports = getRegistryInfoBAL;