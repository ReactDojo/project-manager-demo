import React, { Component } from 'react';
import Button from '../../components/uielements/button';
import Checkbox from '../../components/uielements/checkbox';
import { RadioButton, RadioGroup } from '../../components/uielements/radio';
import { timeDifference } from '../../helpers/utility';
import {
  notification,
  ColorChoser,
  EditableComponent,
} from '../../components/';
import { TaskListWrapper } from './task.style';
import { updateTaskInDB, deleteTaskFromDB } from './dataHelper';
import Spin from '../../containers/Feedback/Spin/spin.style';

function filterTasks(tasks, search) {
  const selectedTasks =
    search === 'All'
      ? tasks
      : tasks.filter(task => task.completed === (search === 'Completed'));
  let completed = 0;
  selectedTasks.forEach(task => {
    if (task.completed) {
      completed += 1;
    }
  });
  return { selectedTasks, completed };
}
export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.singleTask = this.singleTask.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: 'All',
    };
  }
  singleTask(task) {
    const { deleteTask, colors } = this.props;
    const onDelete = () => {
      deleteTask(task._id);
      deleteTaskFromDB(task, (t) => {
        notification(`${t.type}`, `${t.message}`, `${t.description}`);
      });
    }
    const updateTask = (key, value) => {
      task[key] = value;
      this.props.edittask(task);
      updateTaskInDB(task, (t) => {
        notification(`${t.type}`, `${t.message}`, `${t.description}`);
      });
    };
    return (
      <div className="isoTaskList" key={task._id}>
        <ColorChoser
          colors={colors}
          changeColor={value => updateTask('color', value)}
          seectedColor={task.color}
        />
        <Checkbox
          className="isoTaskCheck"
          checked={task.completed}
          onChange={event => updateTask('completed', !task.completed)}
        />
        <div className="isoTaskContentWrapper">
          <span className="isoTaskDate">{timeDifference(task.createTime)}</span>
          <EditableComponent
            value={task.task}
            itemKey="task"
            onChange={updateTask}
          />
        </div>
        <Button
          className="isoTaskDelete"
          icon="close"
          type="button"
          onClick={onDelete}
        />
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const { selectedTasks } = filterTasks(this.props.tasks, search);
    const style = {
      textAlign: 'center',
      background: '#f1f3f6',
      padding: '30px 50px'
    }
    return (
      <TaskListWrapper className="isoTaskContent">
        <div className="isoTaskStatusTab">
          <RadioGroup
            value={this.state.search}
            onChange={this.onChange}
            className="isoTaskStatus"
          >
            <RadioButton value="All">All</RadioButton>
            <RadioButton value="Uncompleted">Uncompleted</RadioButton>
            <RadioButton value="Completed">Completed</RadioButton>
          </RadioGroup>
        </div>

        <div className="isoTaskListWrapper">
          {selectedTasks.length > 0 ? (
            selectedTasks.map(note => this.singleTask(note))
          ) : 
            this.props.loading ? (
              <div style={style}><Spin />&nbsp;&nbsp;&nbsp;Loading..</div>
            ) : (
              <h3 className="isoNoTaskFound">No task found</h3>
            )
          }
        </div>

      </TaskListWrapper>
    );
  }
}
