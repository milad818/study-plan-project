# Exam #1: "Study Plan"
## Student: s300708 ZAKHIREH MILAD 

## React Client Application Routes

- Route `/`: course list to be displayed for unauthenticated (anonymous) users
- Route `login`: login form to be displayed for user authorization
- Route `my-portal`: user's personal portal where they can create/modify their study plan; course list is also available for the users who are logged in


## API Server

- POST `/api/plans`
- 
  - request parameters: type
  - request body content:
  {
    "type": "Full-Time"
  }
  - response body content: _NONE_

- POST `/api/courses`
- 
  - request parameters: id, minCredit, maxCredit, type, userID, courses
  - request body content:
  ```
  {
    id: 57,
    minCredit: 20,
    maxCredit: 40,
    type: 'Part-Time',
    userID: 5,
    courses: [
      Course {
        code: '01TXYOV',
        courseName: 'Web Applications I ',
        credits: 6,
        maxStudents: 3,
        incomps: [Array],
        preps: []
      },
      Course {
        code: '01TYDOV',
        courseName: 'Software networking',
        credits: 7,
        maxStudents: 0,
        incomps: [],
        preps: []
      },
      Course {
        code: '01UDUOV',
        courseName: 'Sicurezza dei sistemi informativi ',
        credits: 12,
        maxStudents: 0,
        incomps: [Array],
        preps: []
      }
    ]
  }
  ```
  - response body content: _NONE_

- GET `/api/sessions/current`
  - request parameters:
  - response body content:

- GET `/api/courses`
  - request parameters: _NONE_
  - response body content:
  ```
  [
    {
      code: '02GOLOV',
      name: 'Architetture dei sistemi di elaborazione ',
      credit: 12,
      maxstudent: 0,
      incompatible: [ '02LSEOV' ],        
      prepcourse: [],
      enroll: 1
    },
    {
      code: '02LSEOV',
      name: 'Computer architectures  ',   
      credit: 12,
      maxstudent: 0,
      incompatible: [ '02GOLOV' ],        
      prepcourse: [],
      enroll: 0
    },
    {
      code: '01SQJOV',
      name: 'Data Science and Database Technology ',
      credit: 8,
      maxstudent: 0,
      incompatible: [ '01SQMOV', '01SQLOV' ],
      prepcourse: [],
      enroll: 0
    },
    {
      code: '01SQMOV',
      name: 'Data Science e Tecnologie per le Basi di Dati ',
      credit: 8,
      maxstudent: 0,
      incompatible: [ '01SQJOV', '01SQLOV' ],
      prepcourse: [],
      enroll: 0
    },
    {
      code: '01SQLOV',
      name: 'Database systems ',
      credit: 8,
      maxstudent: 0,
      incompatible: [ '01SQJOV', '01SQMOV' ],
      prepcourse: [],
      enroll: 0
    }
    .
    .
    .
  ]
  ```

- DELETE `/api/plandata/:id`
  - request parameters: planid
  - response body content: _NONE_


## Database Tables

- Table `user` - contains id, email, password, salt and name
- Table `course` - contains code, name, credit, maxstudent, incompatible, prepcourse
- Table `plan` - contains id, minCredit, maxCredit, type and userID
- Table `enregistry` - contains id, courseCode and planID


## Main React Components

- `CusContent` (in `Components/MainPage.js`): This component holds the main parts of the application, which are customized with respect to the route, together in itself.
- `LoginForm` (in `Components/loginForm.js`): Contains a from through which users can log into their university portal.
- `CusNavBar` (in `Components/CusNavBar.js`): This component is placed at the top of all pages and is mainly composed of login/logout buttons and a title one of which may be replaced with the other under certain circumstances.
- `Program` (in `Components/StudyPlan/Program.js`): component purpose and main functionality
- `Plan` (in `Components/StudyPlan/Plan.js`): component purpose and main functionality
- `CourseList` (in `Components/Courses/CourseList.js`): component purpose and main functionality

(only _main_ components, minor ones may be skipped)


## Screenshot

![Screenshot](./img/screenshot.jpg)


## Users Credentials

- miladml@polito.com, 123456 
- joeyscientist@polito.com, 1234567 
- test1@polito.com, test11 
- test2@polito.com, test22 
- test3@polito.com, test33 
