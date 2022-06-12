"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var postPlanBAL = require("../BAL/postPlan.bal");

var plan = function plan(minCredit, maxCredit, type, userID) {
  _classCallCheck(this, plan);

  this.minCredit = minCredit;
  this.maxCredit = maxCredit;
  this.type = type;
  this.userID = userID;
};

function postPlanAPI(app) {
  app.post("/api/plans", function (req, res) {
    var body = req.body;

    if (body.type !== undefined) {
      var newPlan = new plan(body.minCredit, body.maxCredit, body.type, body.userID); // console.log(newPlan);

      postPlanBAL(newPlan).then(function (result) {
        return res.status(201).send();
      })["catch"](function (err) {
        return res.status(500).json(err);
      });
    } else return res.status(422).send();
  });
}

module.exports = postPlanAPI;