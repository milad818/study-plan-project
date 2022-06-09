

function Course(code, courseName, credits, noStudents, maxStudents, incomps, preps) {
  this.code = code;
  this.courseName = courseName;
  this.credits = credits;
  this.noStudents = noStudents;
  this.maxStudents = maxStudents;
  this.incomps = incomps;
  this.preps = preps;
}


export default Course;