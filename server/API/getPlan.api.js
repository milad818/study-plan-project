const getPlanBAL = require("../BAL/getPlan.bal");

function getPlanAPI(app) {
  app.get("/api/plans/:id", (req, res) => {
    let id = req.params.id;
    getPlanBAL(id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      })
  });
}

module.exports = getPlanAPI;