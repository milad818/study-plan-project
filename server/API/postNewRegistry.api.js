const postNewRegistryBAL = require("../BAL/postNewRegistry.bal");
const isLoggedIn = require("../isLoggedIn");


function postNewRegistryAPI(app) {
  app.post("/api/courses", isLoggedIn, (req, res) => {
    let userid = req.user.id;
    const courses = req.body.courses;
    console.log(userid);
    console.log("in api", courses);
    if (courses !== undefined) {
      postNewRegistryBAL(courses, userid)
        .then(result => {
          return res.status(201).send();
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
    }
    else return res.status(500).json({"message": "Either courseCode or planID is undefined!"});
  });
}


module.exports = postNewRegistryAPI;