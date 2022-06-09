
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CusNavBar from './Components/CusNavBar';
import CourseList from './Components/Courses/CourseList';
import Program from './Components/StudyPlan/Program';
import Plan from './Components/StudyPlan/Plan';
import fakeCourses from './dao';


function App() {

  const [newPlan, setNewPlan] = useState([]);
  const [createPlan, setCreatePlan] = useState(false);
  const [type, setType] = useState();
  const [editMode, setEditMode] = useState(false);
  const [plan, setPlan] = useState([]);
  const [validCredit, setValidCredit] = useState(true);
  const [saveValid, setSaveValid] = useState(false);
  const [newSelectedCredits, setNewSelectedCredits] = useState();
  const [selectedCredits, setSelectedCredits] = useState();



  let sortedCourses = fakeCourses.sort((a,b) => (a.courseName > b.courseName) ? 1 : ((b.courseName > a.courseName) ? -1 : 0))

  // VALIDATION <----

  const checkCanSave = (plan, type) => {
    let i = 0
    let c = 0
    // console.log(plan);
    for (i in plan) {
      c += plan[i].credits
    };
    // console.log("in validation plan", plan);
    // console.log(c);
    if (type === "Full-Time") {
      if (c < 60) {
        return false;
      }
    } else {
      if (c < 20) {
        return false;
      }
    };
    // console.log(c);
    return true;
  };
  // console.log(checkCanSave(newPlan, type));

  const checkValidCredit = (plan, type) => {
    let i = 0
    let c = 0
    for (i in plan) {
      c += plan[i].credits
    };
    if (type === "Full-Time") {
      if (c > 80) {
        return false;
      }
    } else {
      if (c > 40) {
        return false;
      }
    };
    // console.log("in validation", c)
    return true;
  }

  const checkSameCode = (course, np) => {
    let i = 0;
      for(i in np) {
        if(course.code===np[i].code)
        return true;
      }
    return false;
  }

  // console.log("checkSame", checkSameCode(sortedCourses[0], newPlan));

  const checkComp = (c, np) => {
    let i = 0;
    let j = 0;
    let k = 0;
    for(i in c) {
      for(j in np) {
        for(k in np.incomps)
          if(c[i].code===np[j].incomps[k])
            return false;
      }
    };
    return true;
  }

  // console.log("checkComp", checkComp(sortedCourses[0], newPlan));

  const validation = (plan, course, type) => {
    const valPlanCopy = [...plan];
    if(!checkValidCredit(valPlanCopy, type)) {
      window.alert("The number of selected credits exceeds!");
      return false;
    }
    if(checkSameCode(course, valPlanCopy)) {
      return false;
    }
    if(!checkComp(course, valPlanCopy)) {
      return false;
    }
    return true;
  }

  // console.log("checkValidCredit", checkValidCredit(newPlan, type));
  // console.log("checkSame", checkSameCode(sortedCourses[0], newPlan));
  // console.log("checkComp", checkComp(sortedCourses[0], newPlan));
  // console.log(validation(newPlan, sortedCourses[0], type));

  const deleteCourse = (courseCode) => {

    const np = newPlan.filter(cor => cor.code !== courseCode);
    setNewPlan(() => np);
    let i = 0;
    let c = 0;
    for(i in np) {
      c += np[i].credits;
    };
    setNewSelectedCredits(c);
  }

  const addCourse = (course) => {
    const plan = [...newPlan, course]
    console.log(plan);
    let i = 0;
    let c = 0;
    for (i in plan) {
      c += plan[i].credits;
    };
    //if(validation(plan, course, type)) {
    if (checkValidCredit(plan, type)) {    //replace condition with the main validation func
      setNewPlan(plan);
      // setValidCredit(true)
    } else {
      window.alert("The number of selected credits exceeds!")
      return;
      // setValidCredit(false);
    }

    setNewSelectedCredits(c);

  }

  const initPlan = (type) => {
    setCreatePlan(true);
    setType(type);
  }

  const onEdit = () => {
    setEditMode(true)
    setNewPlan([...plan])
  }

  const onSave = (plan, type) => {
    setPlan([...newPlan]);
    console.log("in onsave new plan",plan)
    if (checkCanSave(plan, type)) {
      setSaveValid(true);
    } else {
      setSaveValid(false)
    }
    setSelectedCredits(newSelectedCredits);
    // console.log(newSelectedCredits);
  }

  const cancelHandler = () => {
    setNewPlan([...plan]);
    setNewSelectedCredits(selectedCredits);
  }

  // const compHandler = (fc, np) => {
  //   if(checkSame(fc, np)) {
  //     setCompatibility(false);
  //   }
  // }


  return (

    <Container className="app">
      <Row className='nav-bar'>
        <CusNavBar />
      </Row>
      <Row style={{ marginTop: '2rem' }}>
        <CourseList courses={sortedCourses} newPlan={newPlan} addCourse={addCourse} editMode={editMode}
        validCredit={validCredit} ></CourseList>
      </Row>
      <Row>
        {createPlan ? <Plan newPlan={newPlan} progType={type} deleteCourse={deleteCourse} editMode={editMode} selectedCredits={newSelectedCredits}
          onEdit={onEdit} setEditMode={setEditMode} saveValid={saveValid} onSave={onSave} cancelHandler={cancelHandler} ></Plan> :
          <Program initPlan={initPlan} ></Program>}
      </Row>
    </Container>
  );
}

export default App;
