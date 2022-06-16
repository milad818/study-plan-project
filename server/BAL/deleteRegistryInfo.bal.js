const dbFuncs = require("../DAL/dbFuncs");


function deleteRegistryInfoBAL(planid) {
  return new Promise((resolve, reject) => {
    console.log("in bal", planid);
    try {
      const db = new dbFuncs();
      db.deleteRegistryInfo(planid)
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


module.exports = deleteRegistryInfoBAL;