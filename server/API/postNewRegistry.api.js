const postNewRegistryBAL = require("../BAL/postNewRegistry.bal");
const isLoggedIn = require("../isLoggedIn");


function postNewRegistryAPI(app) {
  app.post("/api/courses", isLoggedIn, (req, res) => {
    let userid = req.user.id;
    const courses = req.body.courses;
    if (courses !== undefined) {
      postNewRegistryBAL(courses, userid)
        .then(result => {
          if(result) return res.status(201).send();
          else {
          return res.status(422).json("");
          }
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    }
    else return res.status(500).json({ "message": "Either courseCode or planID is undefined!" });
  });
}


module.exports = postNewRegistryAPI;