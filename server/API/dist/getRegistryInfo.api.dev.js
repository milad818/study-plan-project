"use strict";

var getRegistryInfoBAL = require("../BAL/getRegistryInfo.bal");

function getRegistryInfoAPI(app) {
  app.get("/api/registries/:id", function (req, res) {
    var planid = req.params.id;
    console.log(planid);
    getRegistryInfoBAL(planid).then(function (result) {
      res.json(result);
    })["catch"](function (err) {
      res.status(500).json(err);
    });
  });
}

module.exports = getRegistryInfoAPI;