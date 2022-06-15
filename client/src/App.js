
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



function App() {

  const [newPlan, setNewPlan] = useState([]);
  const [createPlan, setCreatePlan] = useState(false);
  const [type, setType] = useState();
  const [editMode, setEditMode] = useState(false);
  const [plan, setPlan] = useState([]);
  const [validCredit, setValidCredit] = useState(true);
  const [saveValid, setSaveValid] = useState();
  const [newSelectedCredits, setNewSelectedCredits] = useState();
  const [selectedCredits, setSelectedCredits] = useState();
  const [courseList, setCourseList] = useState(Courses)
  const [message, setMessage] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [userplan, setUserplan] = useState([]);



  useEffect(() => {
    fetch("http://localhost:3001/api/courses").then(res => res.json()).then(data => { console.log(data);
    Courses = data.map(x => new Course(x.code, x.name, x.credit, x.maxstudent, x.incompatible, x.prepcourse));
    let sortedCourses = Courses.sort((a, b) => (a.courseName > b.courseName) ? 1 : ((b.courseName > a.courseName) ? -1 : 0))
    setCourseList(sortedCourses);

  });
  }, []);



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
  console.log(checkCanSave(newPlan, type));

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
        return false;
    }
    return true;
  }

  const checkComp = (c, np) => {
    let i = 0;
    let j = 0;
    for (i in c.incomps) {
      for (j in np)
        if (c.incomps[i] === np[j].code)
          return false;
      }
    return true;
  }

  const checkPrep = (code, np,np2) => {
    const course = np.find(x => x.code === code);
    console.log("inside",course);
    if(course.preps) {
      for(let i of course.preps) {
        const prep = np2.find(x => x.code === i)
        console.log("course inside",prep);

        if(prep) return true;
      }
    }
    return false;
  }

  // const checkPrep = (courseCode, np) => {
  //   let i = 0;
  //   let j = 0;
  //   for(i in np) {
  //     for(j in np.preps) {
  //       if(courseCode === np[i].preps[j]) {
  //         return false;
  //       }
  //     }
  //   return true;
  //   }
  // }

  const checkPrepAdded = (c, np) => {
    let i = 0;
    let j = 0;
    for (i in c.preps) {
      for (j in np)
        if (c.preps[i] === np[j].code)
          return true;
      }
    return false;
  }


  // console.log("checkComp", checkPrep(courseList[0].code, newPlan));

  const courseValidation = (plan, newPlan, course, type) => {
    const valPlan = [...plan];
    const valNewPlan = [...newPlan]
    if (!checkValidCredit(valPlan, type)) {    
      setMessage({msg:'The number of credits exceeds the maximum!', type:'danger'});
      return false;
    }
    if (!checkSameCode(course, valNewPlan)) {
      setMessage({msg:'The course has already been selected!', type:'danger'});
      return false;
    }
    if (!checkComp(course, valNewPlan)) {
      setMessage({msg:'Incompatible!', type:'danger'});
      return false;
    }
    return true;
  }


  const deleteCourse = (courseCode) => {

    console.log("chechPrep",checkPrep(courseCode, newPlan));
    console.log("new plan before", newPlan);
    
    // console.log(np);
    const np = newPlan.filter(cor => cor.code !== courseCode);
    if(checkPrep(courseCode, newPlan,np)) {
      setNewPlan(() => np);
      console.log("newPlan after", np);
    } else {
      setMessage({msg:'You cannot remove the preparatory course first!', type:'danger'});
      return;
    }
    let i = 0;
    let c = 0;
    for (i in np) {
      c += np[i].credits;
    };
    setNewSelectedCredits(c);
  }

  const addCourse = (course,studyPlanCourses) => {
    const plan = [...newPlan, course];
    // console.log(plan);
    let i = 0;
    let c = 0;
    for (i in plan) {
      c += plan[i].credits;
    };

    if(courseValidation(plan, newPlan, course, type)) {
      setNewPlan(plan);
    }
      else return;

    //replace condition with the main validation func
    if (checkValidCredit(plan, type)) {    
      setNewPlan(plan);
    } else {
      setMessage({msg:'The number of selected credits exceeds the maximum!', type:'danger'});
      
    // if (checkSameCode(course, newPlan)) {
    //   setNewPlan(plan);
    // } else {
    //   setMessage({msg:'The course has already been selected!', type:'danger'});
    // }

    // console.log(checkComp(course, newPlan));
    
    // if (checkComp(course, newPlan)) {
    //   setNewPlan(plan);
    // } else {
    //   setMessage({msg:'Incompatible!', type:'danger'});
      // console.log(checkPrepAdded(course, newPlan));
      // if (!checkPrepAdded(course, newPlan)) {
      // setNewPlan(plan);
      // } else {
      // setMessage({msg:'You must add the preparatory course first!', type:'danger'});
      return;
    }
    
      // setValidCredit(false);
    // }
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
    console.log(checkCanSave(newPlan, type));
    console.log(plan);
    if (checkCanSave(plan, type)) {
      // setSaveValid(true);
      setPlan([...newPlan]);
    } else {
      // setSaveValid(false)
      setMessage({msg:'The number of selected credits does not meet the contraint!', type:'danger'});
      return;
    }
    setSelectedCredits(newSelectedCredits);
    // console.log(newSelectedCredits);
  }

  const cancelHandler = () => {
    setNewPlan([...plan]);
    setNewSelectedCredits(selectedCredits);
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.name}!`, type: 'success'})
      setUser(user);
      await getPlan(user.id);  
      return true;
    } catch(err) {
      setMessage({msg: 'Username or Password is wrong!', type: 'danger'});
      return false;
    }
  };

  const getPlan = async (userid) => {
    try {
      const plan = await API.getStudyPlanAPI(userid);
      // console.log(plan);
      if (plan) {
        setUserplan(plan);
        setCreatePlan(true)
        setNewPlan(plan.courses);
        setPlan(plan.courses);
        let i = 0;
        let c = 0;
        for (i in plan.courses) {
          c += plan.courses[i].credits;
        };

        setNewSelectedCredits(c);
      }
    }catch(err) {
      setMessage({msg: err, type: 'danger'});
    }
  };

  useEffect(() => {
    const checkAuth = async() => {
    const userinfo = await API.getUserInfo();
    // console.log("useeffect userinfo", userinfo);
      setLoggedIn(!!userinfo);
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if(loggedIn)
      getPlan(1)
  }, [loggedIn])

  // const handleLogout = async () => {
  //   await API.logOut();
  //   setLoggedIn(false);
  //   // clean up everything
  //   setExams([]);
  //   setMessage('');
  // };




  return (
    <Container>

      <Router>
        <Row className='nav-bar'>
          <CusNavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setMessage={setMessage} />
        </Row>
        {message && <Row><Alert className="fixed-alert" variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert></Row>}
        <Routes>
          <Route path='/login' element={ <LoginForm login={handleLogin} /> } />
          <Route path='/my-portal'
            element={ loggedIn ? <CusContent userplan={userplan} courses={courseList} newPlan={newPlan} addCourse={addCourse} editMode={editMode}
            loggedIn={true} progType={type} deleteCourse={deleteCourse} newSelectedCredits={newSelectedCredits} onEdit={onEdit} createPlan={createPlan}
            setEditMode={setEditMode} saveValid={saveValid} onSave={onSave} cancelHandler={cancelHandler} initPlan={initPlan} validCredit={validCredit} />
            : <Navigate replace to='/login' /> }>
          </Route>
          <Route path='/'
            element={<CusContent courses={courseList} newPlan={newPlan} addCourse={addCourse} editMode={editMode} loggedIn={false}
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
