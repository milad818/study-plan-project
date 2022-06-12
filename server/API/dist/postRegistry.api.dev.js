"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var postRegistryBAL = require("../BAL/postRegistry.bal");

var registry = function registry(coursecode, planid) {
  _classCallCheck(this, registry);

  this.coursecode = coursecode;
  this.planid = planid;
};

function postRegistryAPI(app) {
  app.post("/api/registries", function (req, res) {
    var body = req.body;

    if (body.courseCode !== undefined && body.planID !== undefined) {
      var newRegistry = new registry(body.courseCode, body.planID);
      postRegistryBAL(newRegistry).then(function (result) {
        return res.status(201).send();
      })["catch"](function (err) {
        return res.status(500).json(err);
      });
    } else return res.status(500).json({
      "message": "Either courseCode or planID is undefined!"
    });
  });
}

module.exports = postRegistryAPI;