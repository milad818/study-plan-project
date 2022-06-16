const dbFuncs = require("../DAL/dbFuncs");


function postNewRegistryBAL(courses, userid) {
  return new Promise((resolve, reject) => {
    console.log(userid);
    console.log("in bal", courses);
    try {
      const db = new dbFuncs();
      db.postNewRegistry(courses, userid)
        .then((data) => {
          resolve(data);
        })
    } catch(error) {
      reject(error);
    }
  });
}


module.exports = postNewRegistryBAL;