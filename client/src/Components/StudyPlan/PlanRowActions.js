import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Button } from 'react-bootstrap';
import "./PlanRowActions.css"


function PlanRowActions(props){
  
  function onClick() {
    props.deleteCourse(props.courseId)
  }
  
  return(

    <Container>
      <Button size="sm" variant="danger" onClick={(e) => {onClick(e)}} disabled={!props.editMode ? true : false}>
        <i className='bi bi-trash3'></i>
      </Button>
    </Container>
  );
}


export default PlanRowActions;