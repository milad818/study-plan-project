"use strict";

var express = require("express");

var postPlanAPI = require("./API/postPlan.api");

var deletePlanAPI = require("./API/deletePlan.api");

var getPlanAPI = require("./API/getPlan.api");

var postRegistryAPI = require("./API/postRegistry.api");

var deleteRegistryAPI = require("./API/deleteRegistry.api");

var getRegistryInfoAPI = require("./API/getRegistryInfo.api");

var getAllCoursesAPI = require("./API/getAllCourses.api");

var cors = require("cors");

var PORT = 3001;
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

app.listen(PORT, function () {
  return console.log("The server is listening on http://localhost:".concat(PORT, "/"));
});