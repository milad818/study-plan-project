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
        <Col md="auto" >{props.editMode ? <Button disabled={props.validCredit ? false : true} onClick={(e) => {onClick(e)}} >Add</Button> : <FaBookOpen></FaBookOpen>}</Col>
        <Col><Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              &nbsp;&nbsp;&nbsp;
              <div style={{ fontWeight: 'bold' }}>Course: {props.course.courseName} </div> &nbsp;&nbsp;
              <div> Code: {props.course.code} &nbsp;&nbsp;
                    Credits: {props.course.credits} &nbsp;&nbsp;
                    No. Students: {props.course.noStudents} &nbsp;&nbsp;
                    Max. Students: {props.course.maxStudents}
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {props.course.incomps ? <div>Incompatible with {props.course.incomps.join(', ')} &nbsp;&nbsp;</div> : <div>There are no incompatibilities!&nbsp;&nbsp;</div>}
              {props.course.preps ? <div>Preparatory Courses: {props.course.preps.join(', ')} &nbsp;&nbsp;</div> : <div>There are no preparatory courses!&nbsp;&nbsp;</div>}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </Col>
      </Row>
    </Container>

  );
}


export default CourseListRow;