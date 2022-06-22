const dbFuncs = require("../DAL/dbFuncs");


function postNewRegistryBAL(courses, userid) {
  return new Promise( async (resolve, reject) => {
    try {
      const db = new dbFuncs();
      
      /*** VALIDATION ***/
      
      let totCredits = 0;
      for(let course of courses) {
        totCredits += course.credits;
      }
      const studyPlan = await db.getPlan(userid);
      if (studyPlan.type === "Full-Time") {
        if (totCredits > 80 || totCredits < 60) {
          resolve(false);
          return;
        }
      } else if(studyPlan.type === "Part-Time") {
        if (totCredits > 40 || totCredits < 20) {
          resolve(false);
          return;
        }
      };

      const allCourses = await db.getAllCourses();
      let filteredPlanCourses = [];
      for(let course of courses){
        for(let c of allCourses)
          if(course.code === c.code) {
            filteredPlanCourses.push(c);
          }
      }
      for(let fc of filteredPlanCourses) {
        if(fc.maxStudents !==0) {
          if(fc.enroll >= fc.maxStudents) {
            resolve(false);
            return;
          }
        }
      }

      db.postNewRegistry(courses, userid)
        .then((data) => {
          resolve(true);
        })
    } catch(error) {
      reject(error);
    }
  });
}


module.exports = postNewRegistryBAL;