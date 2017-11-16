import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Input from '../../components/uielements/input';
import taskAction from '../../redux/tasks/actions.js';
import TaskList from './taskList';
import { TaskWrapper } from './task.style';
import { addTaskToDB, getTasksFromDB } from './dataHelper';
import { InputGroup } from '../../components/uielements/input';
import Select, { SelectOption } from '../../components/uielements/select';


const {
  addTask,
  edittask,
  setTasks,
  deleteTask,
  allCompleted,
  deleteCompleted,
} = taskAction;
const { Header, Content } = Layout;
const Option = SelectOption;

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: '',
    };
  }

  componentDidMount() {
    getTasksFromDB((tasks) => {
      this.props.setTasks(tasks);
    });
  }

  render() {
    const {
      tasks,
      colors,
      addTask,
      edittask,
      deleteTask,
      allCompleted,
      deleteCompleted
    } = this.props;
    const selectBefore = (
      <Select defaultValue="Project 1">
        <Option value="Project 1">Project 1</Option>
        <Option value="Project 2">Project 2</Option>
      </Select>
    );
    return (
      <Layout style={{ background: 'none' }}>
        <TaskWrapper className="isomorphicTaskComponent">
          <Header className="isoTaskHeader">
            <InputGroup style={{ marginBottom: '15px' }}>
              <Input
                placeholder={'Type here for add a new task'}
                value={this.state.newTask}
                className="isoTaskInput"
                addonBefore={selectBefore}
                onChange={event => this.setState({ newTask: event.target.value })}
                onPressEnter={event => {
                  this.setState({ newTask: '' });
                  addTask(event.target.value);
                  addTaskToDB(event.target.value, (task) => {
                    console.log(task);
                  });
                }}
              />
            </InputGroup>
          </Header>
          <Content className="isoTaskContentBody">
            <TaskList
              tasks={tasks}
              deleteTask={deleteTask}
              edittask={edittask}
              colors={colors}
              allCompleted={allCompleted}
              deleteCompleted={deleteCompleted}
            />
          </Content>
        </TaskWrapper>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { tasks, colors } = state.Tasks.toJS();
  return {
    tasks,
    colors,
  };
}
export default connect(mapStateToProps, {
  addTask,
  edittask,
  setTasks,
  deleteTask,
  deleteCompleted,
  allCompleted,
})(Task);
