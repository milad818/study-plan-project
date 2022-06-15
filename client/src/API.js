
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

const getStudyPlanAPI = async (userid) => {
  const response = await fetch(SERVER_URL + `/api/plandata/${userid}`, {
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






const API = {logIn, getStudyPlanAPI, getUserInfo};
export default API;