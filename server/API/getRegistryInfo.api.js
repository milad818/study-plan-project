const getRegistryInfoBAL = require("../BAL/getRegistryInfo.bal");


function getRegistryInfoAPI(app) {
  app.get("/api/registries/:id", (req, res) => {
    let planid = req.params.id;
    console.log(planid);
    getRegistryInfoBAL(planid)
      .then((result) => {
          res.json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
}

module.exports = getRegistryInfoAPI;