
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Form } from 'react-bootstrap';
import fakeCourses from './dao';
import CusNavBar from './Components/CusNavBar';
import CusContent from './Components/MainPage';
import DefaultRoute from './DefaultRoute';
import LoginForm from './loginForm';


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
  const [loggedIn, setLoggedIn] = useState(false);




  let sortedCourses = fakeCourses.sort((a, b) => (a.courseName > b.courseName) ? 1 : ((b.courseName > a.courseName) ? -1 : 0))

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
    for (i in np) {
      if (course.code === np[i].code)
        return true;
    }
    return false;
  }

  // console.log("checkSame", checkSameCode(sortedCourses[0], newPlan));

  const checkComp = (c, np) => {
    let i = 0;
    let j = 0;
    let k = 0;
    for (i in c) {
      for (j in np) {
        for (k in np.incomps)
          if (c[i].code === np[j].incomps[k])
            return false;
      }
    };
    return true;
  }

  // console.log("checkComp", checkComp(sortedCourses[0], newPlan));

  const validation = (plan, course, type) => {
    const valPlanCopy = [...plan];
    if (!checkValidCredit(valPlanCopy, type)) {
      window.alert("The number of selected credits exceeds!");
      return false;
    }
    if (checkSameCode(course, valPlanCopy)) {
      return false;
    }
    if (!checkComp(course, valPlanCopy)) {
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
    for (i in np) {
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
    console.log("in onsave new plan", plan)
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

  // const handleLogin = async (credentials) => {
  //   try {
  //     const user = await API.logIn(credentials);
  //     setLoggedIn(true);
  //     setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
  //   }catch(err) {
  //     console.log(err);
  //     setMessage({msg: err, type: 'danger'});
  //   }
  // };

  // const handleLogout = async () => {
  //   await API.logOut();
  //   setLoggedIn(false);
  //   // clean up everything
  //   setExams([]);
  //   setMessage('');
  // };




  return (
    <Container>
      <Row className='nav-bar'>
        <CusNavBar />
      </Row>
      <Router>
        <Routes>
          <Route path='/login' element={ <LoginForm/> } />
          <Route path='/my-portal'
            element={<CusContent courses={sortedCourses} newPlan={newPlan} addCourse={addCourse} editMode={editMode} loggedIn={true}
              progType={type} deleteCourse={deleteCourse} newSelectedCredits={newSelectedCredits} onEdit={onEdit} createPlan={createPlan}
              setEditMode={setEditMode} saveValid={saveValid} onSave={onSave} cancelHandler={cancelHandler} initPlan={initPlan} validCredit={validCredit} />}>
          </Route>
          <Route path='/home-page'
            element={<CusContent courses={sortedCourses} newPlan={newPlan} addCourse={addCourse} editMode={editMode} loggedIn={false}
              progType={type} deleteCourse={deleteCourse} newSelectedCredits={newSelectedCredits} onEdit={onEdit} createPlan={createPlan}
              setEditMode={setEditMode} saveValid={saveValid} onSave={onSave} cancelHandler={cancelHandler} initPlan={initPlan} validCredit={validCredit} />}>
          </Route>
          <Route path='*' element={ <DefaultRoute/> } />
        </Routes>

      </Router>
    </Container>

  );
}

export default App;
