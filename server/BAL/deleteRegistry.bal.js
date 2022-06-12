const dbFuncs = require("../DAL/dbFuncs");


function deleteRegistryBAL(id) {
  return new Promise((resolve, reject) => {
    try {
      const db = new dbFuncs();
      db.deleteRegistry(id)
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


module.exports = deleteRegistryBAL;