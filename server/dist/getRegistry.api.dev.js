"use strict";

var getRegistryBAL = require("./BAL/getRegistry.bal");

function getRegistryAPI(app) {
  app.get("/api/registries/:id", function (req, res) {
    var id = req.params.id;
    var planid = req.params.id;
    console.log(planid);
    getRegistryBAL(planid).then(function (result) {
      res.json(result);
    })["catch"](function (err) {
      res.status(500).json(err);
    });
  });
}

module.exports = getRegistryAPI;