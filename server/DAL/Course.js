'use strict';

function Course(code, courseName, credits, maxStudents, incomps, preps) {
  this.code = code;
  this.courseName = courseName;
  this.credits = credits;
  this.maxStudents = maxStudents;
  this.incomps = incomps;
  this.preps = preps;
}


module.exports = Course;