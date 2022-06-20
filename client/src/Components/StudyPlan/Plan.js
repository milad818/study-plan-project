import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import PlanRow from "./PlanRow";
import './Plan.css'


function Plan(props) {
  
  function saveHandler() {
    props.onSave(props.newPlan, props.progType)
    // props.setEditMode(false);
    // console.log("in plan new plan", props.newPlan)
  }



  
  return (
    <Container style={{marginTop:'2rem'}}>
      <Row xs="auto" >
        <Col><h1 style={{fontSize:'medium'}}>My Study Plan ({props.progType} {"-"} {props.progType==="Full-Time" ? "Min. Credit: 60 Max. Credit: 80" : "Min. Credit: 20 Max. Credit: 40"})</h1></Col>
        <Col className='remove-plan' ><Button variant="link" size="sm" onClick={() => {props.removePlanHandler()}} >(Remove Plan)</Button></Col>
      </Row>
      <Row><Table striped bordered hover>
        <thead>
          <tr>
            <th>Code</th>
            <th>Course Name</th>
            <th>Credits</th>
            {/* <th>Enrolled Students</th> */}
            {/* <th>Max. Students</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.newPlan.map((element) => (
          <PlanRow key={element.code} course={element} deleteCourse={props.deleteCourse} editMode={props.editMode} ></PlanRow>
          ))}
        </tbody>
      </Table></Row>
      <h2 style={{fontSize:"small", float: "center"}} >Selected Credits: {props.selectedCredits} </h2>
      {props.editMode ? <><Button variant="primary" type="button" onClick={(e) => {saveHandler(e)}} 
      /*disabled={props.saveValid ? false : true}*/  >Save</Button> &nbsp;
      <Button variant="secondary" type="button" onClick={() => {props.setEditMode(false); props.cancelHandler()}}>Cancel</Button></> :
      <Button variant="primary" type="button" style={{ marginLeft: "auto" }} onClick={() => props.onEdit()} >Edit</Button>
      }
      
      
    </Container>

  )
}

export default Plan;