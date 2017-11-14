import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Input from '../../components/uielements/input';
import taskAction from '../../redux/tasks/actions.js';
import TaskList from './taskList';
import { TaskWrapper } from './task.style';

const {
  addTask,
  edittask,
  deleteTask,
  allCompleted,
  deleteCompleted,
} = taskAction;
const { Header, Content } = Layout;

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: '',
    };
  }
  render() {
    const {
      tasks,
      colors,
      addTask,
      edittask,
      deleteTask,
      allCompleted,
      deleteCompleted,
    } = this.props;
    return (
      <Layout style={{ background: 'none' }}>
        <TaskWrapper className="isomorphicTaskComponent">
          <Header className="isoTaskHeader">
            <Input
              placeholder={'Type here for add a new task'}
              value={this.state.newTask}
              className="isoTaskInput"
              onChange={event => this.setState({ newTask: event.target.value })}
              onPressEnter={event => {
                this.setState({ newTask: '' });
                addTask(event.target.value);
              }}
            />
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
  deleteTask,
  deleteCompleted,
  allCompleted,
})(Task);
