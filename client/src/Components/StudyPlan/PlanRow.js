
import PlanRowActions from './PlanRowActions';

function PlanRow(props) {
  return(
    <tr>
      <td>
        {props.course.code}
      </td>
      <td>
        {props.course.courseName}
      </td>
      <td>
        {props.course.credits}
      </td>
      <td>
        {props.course.noStudents}
      </td>
      <td>
        {props.course.maxStudents}
      </td>
      <td>
        <PlanRowActions courseId={props.course.code} deleteCourse={props.deleteCourse} editMode={props.editMode}></PlanRowActions>
      </td>
    </tr>
  )
}

export default PlanRow;