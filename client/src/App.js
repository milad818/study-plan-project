
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Alert } from 'react-bootstrap';
import fakeCourses from './dao';
import CusNavBar from './Components/CusNavBar';
import CusContent from './Components/MainPage';
import DefaultRoute from './DefaultRoute';
import LoginForm from './Components/loginForm';
import Course from './Components/Models/Course';
import API from './API';

let Courses = [];
let coursesChangedInUseEffect = false;

function App() {

  const [plan, setPlan] = useState([]);
  const [newPlan, setNewPlan] = useState([]);
  const [fetchedPlan, setFetchedPlan] = useState([]);
  const [createPlan, setCreatePlan] = useState(false);
  const [type, setType] = useState();
  const [editMode, setEditMode] = useState(false);
  const [validCredit, setValidCredit] = useState(true);
  const [saveValid, setSaveValid] = useState();
  const [newSelectedCredits, setNewSelectedCredits] = useState();
  const [selectedCredits, setSelectedCredits] = useState();
  const [courseList, setCourseList] = useState(Courses)
  const [message, setMessage] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [userplan, setUserplan] = useState([]);
  const [addState, setAddState] = useState();


  function getAllCourseList() {
    fetch("http://localhost:3001/api/courses").then(res => res.json()).then(data => {
      Courses = data.map(x => new Course(x.code, x.name, x.credit, x.maxstudent, x.enroll, x.incompatible, x.prepcourse));
      // for(let i of Courses) {
      //   if(i.maxStudents === 0) i.maxStudents = "-";
      // }
      let sortedCourses = Courses.sort((a, b) => (a.courseName > b.courseName) ? 1 : ((b.courseName > a.courseName) ? -1 : 0))

      coursesChangedInUseEffect = false;
      setCourseList(sortedCourses);

    });
  }

  useEffect(() => {
    getAllCourseList();
  }, []);

  useEffect(() => {
    for (let course of courseList) {
      const validation = courseValidation(plan, newPlan, course, type)
      course.validation = validation;
      // console.log(validation)
    }
    coursesChangedInUseEffect = false;
    setCourseList([...courseList]);
  }, [newPlan])

  useEffect(() => {
    for (let course of courseList) {
      const validation = courseValidation(plan, newPlan, course, type)
      course.validation = validation;
    }
    if (!coursesChangedInUseEffect) {
      coursesChangedInUseEffect = true;
      setCourseList([...courseList]);
    }
  }, [courseList])

  useEffect(() => {
    const checkAuth = async () => {
      const userinfo = await API.getUserInfo();
      if (userinfo !== false) {
        setUser(userinfo);
        setLoggedIn(true);
        await getPlan();
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(false);
      }, 5000)
    }
  }, [message])

  /******  VALIDATION ******/

  const checkCanSave = (plan, type) => {
    let i = 0
    let c = 0
    for (i in plan) {
      c += plan[i].credits
    };
    if (type === "Full-Time") {
      if (c < 60) {
        return false;
      }
    } else {
      if (c < 20) {
        return false;
      }
    };
    return true;
  };


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
    return true;
  }

  const checkSameCode = (course, np) => {
    let i = 0;
    for (i in np) {
      if (course.code === np[i].code)
        return false;
    }
    return true;
  }

  const checkComp = (c, np) => {
    for (let i in c.incomps) {
      for (let j in np)
        if (c.incomps[i] === np[j].code)
          return false;
    }
    return true;
  }

  const checkFreeSeat = (course) => {

    if (course.maxStudents !== 0 && course.enrolledStudents >= course.maxStudents)
      return false;
    else return true;
  }

  const checkPrepAdded = (course, studyPlanCourseList) => {
    if (!course.preps) return true;
    const alreadyAddedPreps = course.preps.filter(x => studyPlanCourseList.find(y => y.code.trim() === x.trim()))
    if (alreadyAddedPreps.length === course.preps.length) {
      return true;
    }
    return false;
  }

  const checkPrep = (courseCode, studyPlanCourseList) => {
    const course = studyPlanCourseList.find(x => x.code === courseCode);
    if (!course) return true;
    const existingPrep = studyPlanCourseList.filter(x => x.preps.find(y => y.trim() === courseCode.trim()))
    if (!existingPrep.length) {
      return true;
    }
    return false;
  }

  const courseValidation = (plan, newPlan, course, type) => {
    const valPlan = [...plan];
    const valNewPlan = [...newPlan]
    
    if (!loggedIn) return;
    
    if (!checkFreeSeat(course)) {
      return { result: false, message: { msg: 'The course has reached its maximum and is no longer available!', type: 'danger' } };
    }
    if (!checkValidCredit(valPlan, type)) {
      return { result: false, message: { msg: 'The number of credits exceeds the maximum!', type: 'danger' } };
    }
    if (!checkSameCode(course, valNewPlan)) {
      return { result: false, message: { msg: 'The course has already been selected!', type: 'danger' } };
    }
    if (!checkComp(course, valNewPlan)) {
      return { result: false, message: { msg: `You cannot select "${course.courseName}" because it is incompatible with another course!`, type: 'danger' } };
    }
    if (!checkPrepAdded(course, newPlan)) {
      return { result: false, message: { msg: 'Please add the preparatory course first!', type: 'danger' } };
    }
    return { result: true };
  }


  const deleteCourse = async (courseCode) => {
    if (checkPrep(courseCode, newPlan)) {
      const np = newPlan.filter(cor => cor.code !== courseCode);
      setNewPlan(() => np);
      let i = 0;
      let c = 0;
      for (i in np) {
        c += np[i].credits;
      };
      setNewSelectedCredits(c);
      const courseToDelete = courseList.find(x => x.code === courseCode);
      const newEnrolledStudents = courseToDelete.enrolledStudents - 1;
      courseToDelete.enrolledStudents = newEnrolledStudents;

    } else {
      setMessage({ msg: 'You cannot remove the preparatory course first!', type: 'danger' });
      return;
    }
  }

  const addCourse = async (course, studyPlanCourses) => {
    const plan = [...newPlan, course];
    let i = 0;
    let c = 0;
    for (i in plan) {
      c += plan[i].credits;
    };

    const validationRes = courseValidation(plan, newPlan, course, type);
    if (validationRes.result) {
      setNewPlan(plan);
    }
    else {
      setMessage(validationRes.message)
      return;
    }
    setNewSelectedCredits(c);
    await getAllCourseList();
  }

  const initPlan = (type) => {
    setCreatePlan(true);
    setType(type);
  }

  const onEdit = () => {
    setEditMode(true)
    setNewPlan([...plan])
  }

  const onSave = async (plan, type) => {
    if (checkCanSave(plan, type)) {
      const np = [...newPlan]
      setPlan(() => np);
      await postCourses(plan);
      setEditMode(false);
      await getAllCourseList();
      await getPlan();
    } else {
      setMessage({ msg: 'The number of selected credits does not meet the contraint!', type: 'danger' });
      return;
    }
    setSelectedCredits(newSelectedCredits);
  }

  const cancelHandler = async () => {
    setNewPlan([...plan]);
    await getAllCourseList();
    let c = 0;
    for (let i in plan) {
      c += plan[i].credits;
    };
    setNewSelectedCredits(c);
  }

  
  const removePlanHandler = async () => {
    try {
      await removeStudyPlan(fetchedPlan.id);
      await setNewPlan([]);
      await setPlan([]);
      await getAllCourseList();
      await getPlan();
      setNewSelectedCredits();
    } catch (err) {
      setMessage({ msg: 'Unable to remove the plan!', type: 'danger' });
      return false;
    }
  };

  const postPlanHandler = async (type) => {
    try {
      await postPlan(type);
      await getPlan();
    } catch (err) {
      setMessage({ msg: (err), type: 'danger' });
    }
  }

/*** API Calls ***/

const handleLogin = async (credentials) => {
  try {
    const user = await API.logIn(credentials);
    await getPlan();
    setLoggedIn(true);
    setMessage({ msg: `Welcome, ${user.name}!`, type: 'success' })
    setUser(user);
    return true;
  } catch (err) {
    setMessage({ msg: (err), type: 'danger' });
    return false;
  }
};

const handleLogout = async () => {
  await API.logOutAPI();
  setLoggedIn(false);

  setPlan([]);
  setNewPlan([]);
  setFetchedPlan([]);
  setMessage('');
  setEditMode(false);
};

  const getPlan = async () => {
    try {
      const plan = await API.getStudyPlanAPI();
      if (plan) {
        setUserplan(plan);
        setCreatePlan(true)
        setNewPlan(plan.courses);
        setPlan(plan.courses);
        setFetchedPlan(plan);
        setType(plan.type);
        let i = 0;
        let c = 0;
        for (i in plan.courses) {
          c += plan.courses[i].credits;
        };
        setNewSelectedCredits(c);
      }
    } catch (err) {
      setMessage({ msg: `NOTICE! You have not set a study plan yet, choose a program type to start!`, type: 'danger' });
    }
  };

  const removeStudyPlan = async (planid) => {
    try {
      await API.removeStudyPlanAPI(planid);
      await getPlan();
      setCreatePlan(false);
    } catch (err) {
      setMessage({ msg: "Cannot remove the plan!", type: 'danger' });
    };
  };

  const postPlan = async (type) => {
    try {
      await API.postPlanAPI(type);
    } catch (err) {
      setMessage({ msg: (err), type: 'danger' });
    }
  }

  const postCourses = async (courses) => {
    try {
      await API.postCoursesAPI(courses);
    } catch (err) {
      setMessage({ msg: (err), type: 'danger' });
    }
  }



  return (
    <Container>

      <Router>
        <Row className='nav-bar'>
          <CusNavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setMessage={setMessage} handleLogout={handleLogout} />
        </Row>
        {message && <Row><div className="fixed-alert"><Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert></div></Row>}
        <Routes>
          <Route path='/login' element={<LoginForm login={handleLogin} />} />
          <Route path='/my-portal'
            element={<CusContent userplan={userplan} courses={courseList} plan={plan} newPlan={newPlan} editMode={editMode}
              loggedIn={true} progType={type} validCredit={validCredit} newSelectedCredits={newSelectedCredits} addCourse={addCourse}
              deleteCourse={deleteCourse} onEdit={onEdit} createPlan={createPlan} setEditMode={setEditMode} saveValid={saveValid} onSave={onSave}
              cancelHandler={cancelHandler} initPlan={initPlan} removePlanHandler={removePlanHandler} postPlanHandler={postPlanHandler} />}>
          </Route>
          <Route path='/'
            element={<CusContent courses={courseList} loggedIn={false} newPlan={newPlan} addCourse={addCourse} editMode={editMode}
              progType={type} deleteCourse={deleteCourse} newSelectedCredits={newSelectedCredits} onEdit={onEdit} createPlan={createPlan}
              setEditMode={setEditMode} saveValid={saveValid} onSave={onSave} cancelHandler={cancelHandler} initPlan={initPlan} validCredit={validCredit} />}>
          </Route>
          <Route path='*' element={<DefaultRoute />} />
        </Routes>
      </Router>
    </Container>

  );
}

export default App;
