const dbFuncs = require("../DAL/dbFuncs");


function postRegistryBAL(registry) {
  return new Promise((resolve, reject) => {
    try {
      const db = new dbFuncs();
      db.postRegistry(registry)
        .then((data) => {
          resolve(data);
        })
    } catch(error) {
      reject(error);
    }
  });
}


module.exports = postRegistryBAL;