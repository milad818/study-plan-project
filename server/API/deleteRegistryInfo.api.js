const deleteRegistryInfoBAL = require("../BAL/deleteRegistryInfo.bal");
const isLoggedIn = require("../isLoggedIn");


function deleteRegistryInfoAPI(app) {
  app.delete("/api/plandata/:id", isLoggedIn, (req, res) => {
    let planid = req.params.id;
    console.log("in api",planid);
    deleteRegistryInfoBAL(planid)
    .then((result) => {
      res.json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
}


module.exports = deleteRegistryInfoAPI;