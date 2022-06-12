"use strict";

var deleteRegistryBAL = require("../BAL/deleteRegistry.bal");

function deleteRegistryAPI(app) {
  app["delete"]("/api/registries/:id", function (req, res) {
    var id = req.params.id;
    deleteRegistryBAL(id).then(function (result) {
      res.json(result);
    })["catch"](function (err) {
      res.status(500).json(err);
    });
  });
}

module.exports = deleteRegistryAPI;