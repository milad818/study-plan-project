"use strict";

var getPlanBAL = require("../BAL/getPlan.bal");

function getPlanAPI(app) {
  app.get("/api/plans/:id", function (req, res) {
    var id = req.params.id;
    getPlanBAL(id).then(function (result) {
      res.json(result);
    })["catch"](function (err) {
      res.status(500).json(err);
    });
  });
}

module.exports = getPlanAPI;