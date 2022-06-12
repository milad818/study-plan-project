"use strict";

var deletePlanBAL = require("../BAL/deletePlan.bal");

function deletePlanAPI(app) {
  app["delete"]("/api/plans/:id", function (req, res) {
    var id = req.params.id;
    deletePlanBAL(id).then(function (result) {
      res.json(result);
    })["catch"](function (err) {
      res.status(500).json(err);
    });
  });
}

module.exports = deletePlanAPI;