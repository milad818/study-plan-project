import { Container, Row, Button } from 'react-bootstrap';
import CourseList from './Courses/CourseList';
import Program from './StudyPlan/Program';
import Plan from './StudyPlan/Plan';



function CusContent(props) {
  return (

    <Container className="app">

      <Row style={{ marginTop: '2rem' }}>
        <CourseList courses={props.courses} newPlan={props.newPlan} addCourse={props.addCourse} editMode={props.editMode}
          validCredit={props.validCredit} ></CourseList>
      </Row>
      {props.loggedIn ? 
      <Row>
        {props.createPlan ? <Plan userplan={props.userplan} loggedIn={props.loggedIn} fetchedPlan={props.fetchedPlan} newPlan={props.newPlan} progType={props.progType}
        plan={props.plan} deleteCourse={props.deleteCourse} editMode={props.editMode} selectedCredits={props.newSelectedCredits} onEdit={props.onEdit} setEditMode={props.setEditMode}
        saveValid={props.saveValid} onSave={props.onSave}
        cancelHandler={props.cancelHandler} removePlanHandler={props.removePlanHandler} ></Plan> :
          <Program initPlan={props.initPlan} postPlanHandler={props.postPlanHandler}></Program>}
      </Row> : ""}
    </Container>

  );
}


export default CusContent;