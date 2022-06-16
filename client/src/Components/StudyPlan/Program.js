import { Container, Form, Button } from "react-bootstrap";


function Program(props) {
  return (
    <Container style={{ marginTop: '2rem' }} >
      <h1 style={{ fontSize: 'medium' }}>Choose your program type:</h1>
      <Button variant="success" onClick={() => {props.initPlan("Full-Time"); props.postPlanHandler("Full-Time")}}>Full-Time</Button> &nbsp;&nbsp;&nbsp;
      <Button variant="success" onClick={() => {props.initPlan("Part-Time"); props.postPlanHandler("Part-Time")}}>Part-Time</Button>
      <br />
    </Container>
  )
}

export default Program;