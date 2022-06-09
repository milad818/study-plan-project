import { Container, Form, Button } from "react-bootstrap";


function Program(props) {
  return (
    <Container style={{ marginTop: '2rem' }} >
      <h1 style={{ fontSize: 'medium' }}>Choose your study plan:</h1>
      <Button variant="success" onClick={() => {props.initPlan("Full-Time")}}>Full-Time</Button> &nbsp;&nbsp;&nbsp;
      <Button variant="success" onClick={() => {props.initPlan("Part-Time")}}>Part-Time</Button>
      <br />
    </Container>
  )
}

export default Program;