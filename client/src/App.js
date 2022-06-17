
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


  function getAllCourseList() {
    fetch("http://localhost:3001/api/courses").then(res => res.json()).then(data => {
      Courses = data.map(x => new Course(x.code, x.name, x.credit, x.maxstudent, x.enroll, x.incompatible, x.prepcourse));
      let sortedCourses = Courses.sort((a, b) => (a.courseName > b.courseName) ? 1 : ((b.courseName > a.courseName) ? -1 : 0))
      setCourseList(sortedCourses);
  
    });
  }

  useEffect(() => {
    getAllCourseList();
  }, []);



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

  // console.log("checkCanSave result",checkCanSave(newPlan, type));

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
  //   for(let i in np) {
  //     for(let j of np.preps) {
  //       np[i].preps[j].find(x => courseCode === x);
  //       // console.log(np[i].preps[j]);

  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // const checkPrep = (courseCode, np) => {
  //   for(let i in np) {
  //     for(let j of np.preps) {
  //       if(np[i].preps[j]===courseCode)
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // console.log("checkCanSave result",checkPrep(courseCode, np));


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
    if(checkPrep(courseCode, np)) {
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
    console.log("courssssss", course)
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

  const onSave = async (plan, type) => {
    // console.log(checkCanSave(newPlan, type));
    // console.log(plan);
    if (checkCanSave(plan, type)) {
      // setSaveValid(true);
      const np = [...newPlan]
      setPlan(() => np);
      // console.log("in save plan", plan);
      await postCourses(plan);
      setEditMode(false);
      await getAllCourseList();
      await getPlan();
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
      await getPlan();  
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.name}!`, type: 'success'})
      setUser(user);
      return true;
    } catch(err) {
      setMessage({msg: (err), type: 'danger'});
      return false;
    }
  };

  const removePlanHandler = async () => {
    try{
      await removeStudyPlan(fetchedPlan.id);
      await setNewPlan([]);
      await setPlan([]);
      await getAllCourseList();
      await getPlan();
      setNewSelectedCredits();
    } catch(err) {
      setMessage({msg: 'Unable to remove the plan!', type: 'danger'});
      return false;
    }
  };

  const postPlanHandler = async (type) => {
    try{
      await postPlan(type);
      await getPlan();
    } catch(err) {
      setMessage({msg: (err) , type: 'danger'});
    }
  }
  
  const getPlan = async () => {
    try {
      const plan = await API.getStudyPlanAPI();
      // console.log("plan", plan);
      // console.log("newPlan", newPlan);

      if (plan) {
        setUserplan(plan);
        setCreatePlan(true)
        setNewPlan(plan.courses);
        setPlan(plan.courses);
        setFetchedPlan(plan);
        // console.log("plan.courses", plan.courses);
        // console.log("plan2", plan);
        // console.log("newPlan2", newPlan);
        setType(plan.type);
        let i = 0;
        let c = 0;
        for (i in plan.courses) {
          c += plan.courses[i].credits;
        };

        setNewSelectedCredits(c);
      } 
      // else {
      //   setPlan([]);
      //   setNewPlan([]);

      // }
    }catch(err) {
      setMessage({msg: `NOTICE! You have not set a study plan yet, choose a program type to start!`, type: 'danger'});
    }
  };

  const removeStudyPlan = async (planid) => {
    try {
      await API.removeStudyPlanAPI(planid);
      await getPlan();
      setCreatePlan(false);


    } catch(err) {
      setMessage({msg: "Cannot remove the plan!" , type: 'danger'});
    };
  };

  const postPlan = async (type) => {
    try {
      await API.postPlanAPI(type);
    } catch(err) {
      setMessage({msg: (err) , type: 'danger'});
    }
  }

  const postCourses = async (courses) => {
    try {
      await API.postCoursesAPI(courses);
    } catch(err) {
      setMessage({msg: (err) , type: 'danger'});
    }
  }

  useEffect(() => {
    const checkAuth = async() => {
    const userinfo = await API.getUserInfo();
      setLoggedIn(!!userinfo);
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await API.logOutAPI();
    setLoggedIn(false);

    setPlan([]);
    setNewPlan([]);
    setFetchedPlan([]);
    setMessage('');
  };




  return (
    <Container>

      <Router>
        <Row className='nav-bar'>
          <CusNavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setMessage={setMessage} handleLogout={handleLogout} />
        </Row>
        {message && <Row><Alert className="fixed-alert" variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert></Row>}
        <Routes>
          <Route path='/login' element={ <LoginForm login={handleLogin} /> } />
          <Route path='/my-portal'
            element={ loggedIn ? <CusContent userplan={userplan} courses={courseList} plan={plan} newPlan={newPlan} editMode={editMode}
            loggedIn={true} progType={type} validCredit={validCredit} newSelectedCredits={newSelectedCredits} addCourse={addCourse}
            deleteCourse={deleteCourse} onEdit={onEdit} createPlan={createPlan} setEditMode={setEditMode} saveValid={saveValid} onSave={onSave}
            cancelHandler={cancelHandler} initPlan={initPlan} removePlanHandler={removePlanHandler} postPlanHandler={postPlanHandler}  />
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
