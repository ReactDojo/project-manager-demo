import { Map } from 'immutable';
import fakeData from '../../containers/Tasks/fakeData';
import taskActions from './actions';

const colors = ['#7ED321', '#de1b1b', '#511E78', '#ff9009', '#42a5f5'];
const tasks = new fakeData(5, colors.length).getAll();

const initState = new Map({
  tasks,
  colors
});

export default function taskReducer(state = initState, action) {
  const tasks = state.get('tasks');
  const newtasks = [];
  switch (action.type) {
    case taskActions.CHANGE_TASK:
      return state.set('tasks', action.tasks);
    case taskActions.ALL_COMPLETED:
      tasks.forEach(task => {
        task.completed = true;
        newtasks.push(task);
      });
      return state.set('tasks', newtasks);
    case taskActions.DELETE_COMPLETED:
      tasks.forEach(task => {
        if (task.completed !== true) {
          newtasks.push(task);
        }
      });
      return state.set('tasks', newtasks);
    default:
      return state;
  }
}