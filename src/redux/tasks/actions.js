const taskActions = {
  CHANGE_TASK: 'CHANGE_TASK',
  SET_TASKS: 'SET_TASKS',
  ALL_COMPLETED: 'ALL_COMPLETED',
  DELETE_COMPLETED: 'DELETE_COMPLETED',

  addTask: (task) => {
    return (dispatch, getState) => {
      const newTask = {
        _id: new Date(),
        task: task,
        createTime: new Date(),
        color: 0,
        completed: false,
      };
      const tasks = [newTask, ...getState().Tasks.get('tasks')];
      dispatch({
        type: taskActions.CHANGE_TASK,
        tasks,
      });
    };
  },
  setTasks: (tasks) => {
    return (dispatch, getState) => {
      dispatch({
        type: taskActions.SET_TASKS,
        tasks
      });
    };
  },
  edittask: (editTask) => {
    return (dispatch, getState) => {
      const oldTasks = getState().Tasks.get('tasks');
      const tasks = [];
      oldTasks.forEach(task => {
        if (task._id !== editTask._id) {
          tasks.push(task);
        } else {
          tasks.push(editTask);
        }
      });
      dispatch({
        type: taskActions.CHANGE_TASK,
        tasks,
      });
    };
  },
  deleteTask: (_id) => {
    return (dispatch, getState) => {
      const oldTasks = getState().Tasks.get('tasks');
      const tasks = [];
      oldTasks.forEach(task => {
        if (task._id !== _id) {
          tasks.push(task);
        }
      });
      dispatch({
        type: taskActions.CHANGE_TASK,
        tasks,
      });
    };
  },
  allCompleted: () => {
    return (dispatch, getState) => {
      const oldTasks = getState().Tasks.get('tasks');
      const tasks = [];
      oldTasks.forEach(task => {
        task.completed = true;
        tasks.push(task);
      });
      dispatch({
        type: taskActions.CHANGE_TASK,
        tasks,
      });
    };
  },
  deleteCompleted: () => {
    return (dispatch, getState) => {
      const oldTasks = getState().Tasks.get('tasks');
      const tasks = [];
      oldTasks.forEach(task => {
        if (!task.completed) {
          tasks.push(task);
        }
      });
      dispatch({
        type: taskActions.CHANGE_TASK,
        tasks,
      });
    };
  },
};
export default taskActions;