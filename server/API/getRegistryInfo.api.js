const getRegistryInfoBAL = require("../BAL/getRegistryInfo.bal");
const isLoggedIn = require("../isLoggedIn");


function getRegistryInfoAPI(app) {
  app.get("/api/plandata", isLoggedIn, (req, res) => {
    getRegistryInfoBAL(req.user.id)
      .then((result) => {
          res.json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
}

module.exports = getRegistryInfoAPI;