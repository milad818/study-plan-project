const express = require("express");

const postPlanAPI = require("./API/postPlan.api");
const deletePlanAPI = require("./API/deletePlan.api");
const getPlanAPI = require("./API/getPlan.api");
const postRegistryAPI = require("./API/postRegistry.api");
const deleteRegistryAPI = require("./API/deleteRegistry.api");
const getRegistryInfoAPI = require("./API/getRegistryInfo.api");
const getAllCoursesAPI = require("./API/getAllCourses.api");






var cors = require("cors");

const PORT = 3001;

app = new express();
app.use(express.json());
app.use(cors());


/********** initialize APIs here **********/

postPlanAPI(app);
deletePlanAPI(app);
getPlanAPI(app);
postRegistryAPI(app);
deleteRegistryAPI(app);
getAllCoursesAPI(app);




/*****************************************/


app.listen(PORT, () =>
  console.log(`The server is listening on http://localhost:${PORT}/`)
);