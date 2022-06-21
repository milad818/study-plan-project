
const SERVER_URL = 'http://localhost:3001';




const logIn = async (credentials) => {
  const response = await fetch(SERVER_URL + '/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  if(response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const logOutAPI = async() => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return null;
}

const getUserInfo = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    credentials: 'include',
  });
  if (response.ok) {
    const user = await response.json();
    return user.user;
  } else {
    const errMsg = "Request Failed!";
    throw (errMsg);  // an object with the error coming from the server
  }
};

const getStudyPlanAPI = async () => {
  const response = await fetch(SERVER_URL + `/api/plandata/`, {
    credentials: 'include',
  });
  if(response.ok) {
    const plan = await response.json();
    return plan;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const removeStudyPlanAPI = async (planid) => {
  try {
    const res = await fetch(`${SERVER_URL}/api/plandata/${planid}`, {
      credentials: 'include',
      method: 'DELETE'
    });
    if (res.ok) {
      return null;
    }
    else {
      const errMessage = await res.json();
      throw errMessage;
    }
  } catch (err) {
    throw new Error('No communication with the server!')
  }
}

const postPlanAPI = async (type) => {
  const res = await fetch(SERVER_URL + '/api/plans', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "type": type })
  });

  if (!res.ok) {
    const errMessage = await res.json();
    throw errMessage;
  }
  else return null;
};

const postCoursesAPI = async (courses) => {
  const res = await fetch(SERVER_URL + '/api/courses', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "courses": courses })
  });

  if (!res.ok) {
    const errMessage = await res.json();
    throw errMessage;
  }
  else return null;
};



const API = {logIn, getStudyPlanAPI, getUserInfo, removeStudyPlanAPI, postPlanAPI, postCoursesAPI, logOutAPI};
export default API;