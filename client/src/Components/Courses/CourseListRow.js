import './CourseListRow.css'
import { Container, Accordion, Button, Col, Row } from 'react-bootstrap';
import { FaBookOpen } from 'react-icons/fa'



function CourseListRow(props) {

  function onClick(e) {
    e.stopPropagation();
    props.addCourse(props.course);
    // props.addHandler(props.fakeCourses, props.newPlan);

    // props.onSubmit({watchDate,isFavorite,filmName:name,rating});
    // setDate(today);
    // setIsFavorite(false);
    // setName('');
    // setRating(0);
  }


  return (

    <Container fluid={'md'}>
      <Row>
        <Col md="auto" >{props.editMode ? <Button className='button-add' variant='success' disabled={props.validCredit ? false : true} onClick={(e) => { onClick(e) }} >+</Button> : <FaBookOpen></FaBookOpen>}</Col>
        <Col><Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="1">
            <Accordion.Header className='acc-header' >
              <div className='acc-header'>
                <div className='course-title' >{props.course.validation && !props.course.validation.result ?<div className='acc-validation'>!</div>:''}{props.course.courseName}</div>
                <div className='course-description' > Code: {props.course.code} &nbsp;&nbsp;
                  Credits: {props.course.credits} &nbsp;&nbsp;
                  Enrolled Students: {props.course.enrolledStudents} &nbsp;&nbsp;
                  Max. Students: {props.course.maxStudents === 0 ? "-" : props.course.maxStudents}
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {props.course.incomps && props.course.incomps.length !== 0 ? <div className='inc-prep' >- Incompatible with {props.course.incomps.join(", ")} &nbsp;&nbsp;</div> : <div className='inc-prep'>- There are no incompatibilities!&nbsp;&nbsp;</div>}
              {props.course.preps && props.course.preps.length !== 0 ? <div className='inc-prep' >- Preparatory Courses: {props.course.preps.join(", ")} &nbsp;&nbsp;</div> : <div className='inc-prep'>- There are no preparatory courses!&nbsp;&nbsp;</div>}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </Col>
      </Row>
    </Container>

  );
}


export default CourseListRow;