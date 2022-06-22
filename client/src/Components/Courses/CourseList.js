import React from 'react';
import { Container } from 'react-bootstrap';
import CourseListRow from './CourseListRow';



function CourseList(props) {


  return (
    <Container>
      <h1 style={{ fontSize: '1.5rem' }}>Available Courses</h1>
      {props.courses.map((element) => (
      <CourseListRow key={element.code} course={element} addCourse={props.addCourse} 
      editMode={props.editMode} validCredit={props.validCredit} ></CourseListRow>
      ))}

    </Container>
  );
}

export default CourseList;