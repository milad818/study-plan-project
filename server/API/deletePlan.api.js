const deletePlanBAL = require("../BAL/deletePlan.bal");
const isLoggedIn = require("../isLoggedIn");


function deletePlanAPI(app) {
  app.delete("/api/plans/:id", isLoggedIn, (req, res) => {
    let id = req.params.id;
    deletePlanBAL(id)
    .then((result) => {
      res.json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
}


module.exports = deletePlanAPI;