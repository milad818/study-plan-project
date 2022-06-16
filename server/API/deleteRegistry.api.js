const deleteRegistryBAL = require("../BAL/deleteRegistry.bal");
const isLoggedIn = require("../isLoggedIn");


function deleteRegistryAPI(app) {
  app.delete("/api/registries/:id", isLoggedIn, (req, res) => {
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