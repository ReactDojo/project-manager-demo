import apiUrl from '../../config';

function addProjectToDB(project, cb) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  fetch(`${apiUrl}/projects`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(project)
  }).then(response => {
    if (!response.ok) {
      console.log(response);
    }
    return response
  }).then(d => d.json())
    .then(project => {
      cb(project);
    });
}

function getProjectsFromDB(cb) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  fetch(`${apiUrl}/projects`, {
    method: "GET",
    headers: myHeaders
  }).then(response => {
    if (!response.ok) { console.log(response); }
    return response
  }).then(d => d.json())
    .then(projects => { cb(projects); });
}

function updateProjectInDB(project, cb) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  fetch(`${apiUrl}/project/${project._id}`, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(project)
  }).then(response => {
    if (!response.ok) {
      console.log(response);
    }
    return response
  }).then(d => d.json())
    .then(t => {
      cb(t);
    });
}

function deleteProjectFromDB(project, cb) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  fetch(`${apiUrl}/project/${project._id}`, {
    method: "DELETE",
    headers: myHeaders,
    body: JSON.stringify(project)
  }).then(response => {
    if (!response.ok) {
      console.log(response);
    }
    return response
  }).then(d => d.json())
    .then(t => {
      cb(t);
    });
}

export { 
  addProjectToDB, 
  getProjectsFromDB,
  updateProjectInDB,
  deleteProjectFromDB
}

