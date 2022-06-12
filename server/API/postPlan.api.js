const postPlanBAL = require("../BAL/postPlan.bal");

class plan {
  constructor(minCredit, maxCredit, type, userID) {
    this.minCredit = minCredit;
    this.maxCredit = maxCredit;
    this.type = type;
    this.userID = userID
  }
}


function postPlanAPI(app) {
  app.post("/api/plans", (req, res) => {
    const body = req.body;
    if ( body.type !== undefined ) {
      let newPlan = new plan(body.minCredit, body.maxCredit, body.type, body.userID);
      // console.log(newPlan);

      postPlanBAL(newPlan)
        .then(result => {
          return res.status(201).send();
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    }
    else return res.status(422).send();
  })
}


module.exports = postPlanAPI;
