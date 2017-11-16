import apiUrl from '../../config';

function addTaskToDB(task, cb) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  fetch(`${apiUrl}/tasks`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ task: task })
  }).then(response => {
    if (!response.ok) {
      console.log(response);
    }
    return response
  }).then(d => d.json())
    .then(task => {
      cb(task);
    });
}

function getTasksFromDB(cb) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  fetch(`${apiUrl}/tasks`, {
    method: "GET",
    headers: myHeaders
  }).then(response => {
    if (!response.ok) { console.log(response); }
    return response
  }).then(d => d.json())
    .then(tasks => { cb(tasks); });
}

function updateTaskInDB(task, cb) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  fetch(`${apiUrl}/task/${task._id}`, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(task)
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

function deleteTaskFromDB(task, cb) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  fetch(`${apiUrl}/task/${task._id}`, {
    method: "DELETE",
    headers: myHeaders,
    body: JSON.stringify(task)
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
  addTaskToDB, 
  getTasksFromDB,
  updateTaskInDB,
  deleteTaskFromDB
}

