'use strict';




function getUserInfoAPI(app) {
  app.get("/api/sessions/current", (req, res) => {

    if (req.isAuthenticated()) {
      const user = req?.session?.password?.user;
      res.json({user:user});
    }
    else res.json({user:false});

  });
}

module.exports = getUserInfoAPI;