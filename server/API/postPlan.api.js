const postPlanBAL = require("../BAL/postPlan.bal");
const isLoggedIn = require("../isLoggedIn");


class Plan {
  constructor(mincredit, maxcredit, type, userid) {
    this.mincredit = mincredit;
    this.maxcredit = maxcredit;
    this.type = type;
    this.userid = userid
  }
}


function postPlanAPI(app) {
  app.post("/api/plans", isLoggedIn, (req, res) => {
    const body = req.body;
    if ( body.type !== undefined ) {
      let planToPost;
      if(body.type==="Full-Time") {
        const mincredit = 40;
        const maxcredit = 60;
        const user = req.user.id;
        // console.log("full user", user);
         planToPost = new Plan(mincredit, maxcredit, body.type, user);
      } else if(body.type==="Part-Time") {
        const mincredit = 20;
        const maxcredit = 40;
        const user = req.user.id;
         planToPost = new Plan(mincredit, maxcredit, body.type, user);
      } else{
        return res.status(404).send({msg: "Entry is not valid!"})
      }
      postPlanBAL(planToPost)
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
