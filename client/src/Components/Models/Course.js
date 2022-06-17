

function Course(code, courseName, credits, maxStudents, enrolledStudents, incomps, preps) {
  this.code = code;
  this.courseName = courseName;
  this.credits = credits;
  this.maxStudents = maxStudents;
  this.enrolledStudents = enrolledStudents;
  this.incomps = incomps;
  this.preps = preps;
}


export default Course;