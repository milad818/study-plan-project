import React from 'react';
import { Container } from 'react-bootstrap';
import CourseListRow from './CourseListRow';



function CourseList(props) {


  return (
    <Container>
      <h1 style={{ fontSize: '1.5rem' }}>Available Courses</h1>
      {props.courses.map((element) => (
      <CourseListRow key={element.code} course={element} fakeCourses={props.fakeCourses} newPlan={props.newPlan} addCourse={props.addCourse}
      editMode={props.editMode} validCredit={props.validCredit} compatibility={props.compatibility} compHandler={props.compHandler}></CourseListRow>
      ))}

    </Container>
  );
}

export default CourseList;