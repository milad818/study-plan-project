const postRegistryBAL = require("../BAL/postRegistry.bal");
const isLoggedIn = require("../isLoggedIn");

class registry {
  constructor(coursecode, planid) {
    this.coursecode = coursecode;
    this.planid = planid;
  }
}

function postRegistryAPI(app) {
  app.post("/api/registries", isLoggedIn, (req, res) => {
    const body = req.body
    if (body.courseCode !== undefined && body.planID !== undefined) {
      let newRegistry = new registry(body.courseCode, body.planID)
      postRegistryBAL(newRegistry)
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


module.exports = postRegistryAPI;