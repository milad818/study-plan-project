'use strict';


function logoutAPI (app) {
  app.delete('/api/sessions/current', (req, res) => {
      req.logout(() => {
          res.end();
      });
  });
}


module.exports = logoutAPI;