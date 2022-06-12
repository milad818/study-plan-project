const deleteRegistryBAL = require("../BAL/deleteRegistry.bal");


function deleteRegistryAPI(app) {
  app.delete("/api/registries/:id", (req, res) => {
    let id = req.params.id;
    deleteRegistryBAL(id)
    .then((result) => {
      res.json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
}


module.exports = deleteRegistryAPI;