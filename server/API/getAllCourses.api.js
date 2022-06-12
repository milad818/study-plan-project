const getAllCoursesBAL = require("../BAL/getAllCourses.bal");


function getAllCoursesAPI() {
  app.get("/api/courses", (req, res) => {
    getAllCoursesBAL()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).json(err)
      });
  });
}


module.exports = getAllCoursesAPI;