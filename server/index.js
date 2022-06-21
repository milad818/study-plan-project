'use strict';

const express = require("express");
const morgan = require("morgan") ;
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");

const dbFuncs = require("./DAL/dbFuncs");
const db = new dbFuncs();

/*** to test db functions ***/
// db.getAllPlans(1).then((x) => console.log(x));
// db.getAllRegisteries().then((x) => console.log(x));
// db.getRegistryInfo(1).then((x) => console.log(x));


const port = 3001;

const app = new express();
app.use(express.json());
app.use(morgan('dev'))

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
}
app.use(cors(corsOptions));


/*** Passport: Set up the local strategy ***/
passport.use(new LocalStrategy(async function verify(username, password, callback) {
  // const user = await userDao.getUser(username, password);
  const user = await db.getUser(username, password);
  if(!user)
    return callback(null, false);
  return callback(null, user);
}));

passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(user, callback) {
  return callback(null, user);
});

app.use(session({
  secret: 'Hey, yo!',
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.authenticate('session'));


/*** Plan APIs ***/

const postPlanAPI = require("./API/postPlan.api");
const deletePlanAPI = require("./API/deletePlan.api");
const getPlanAPI = require("./API/getPlan.api");
const postRegistryAPI = require("./API/postRegistry.api");
const deleteRegistryAPI = require("./API/deleteRegistry.api");
const getRegistryInfoAPI = require("./API/getRegistryInfo.api");
const getAllCoursesAPI = require("./API/getAllCourses.api");
const getUserInfoAPI = require("./API/getUserInfo.api");
const deleteRegistryInfoAPI = require("./API/deleteRegistryInfo.api")
const postNewRegistryAPI = require("./API/postNewRegistry.api");
const logoutAPI = require('./API/logout.api');



/*** User APIs ***/

app.post("/api/sessions", passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});


/********** initialize APIs here **********/

getUserInfoAPI(app);
postPlanAPI(app);
deletePlanAPI(app);
getPlanAPI(app);
postRegistryAPI(app);
deleteRegistryAPI(app);
getRegistryInfoAPI(app);
getAllCoursesAPI(app);
deleteRegistryInfoAPI(app);
postNewRegistryAPI(app);


logoutAPI(app);


/*****************************************/


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});