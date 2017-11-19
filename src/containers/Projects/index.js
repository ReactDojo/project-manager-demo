import React, { Component } from 'react';
import { connect } from 'react-redux';
import projectAction from '../../redux/projects/actions';
import { Layout, Icon } from 'antd';
import Button from '../../components/uielements/button';
import ProjectList from '../../components/projects/projectList';
import SingleProjectView from '../../components/projects/singleView';
import EditProjectView from '../../components/projects/editView';
import DeleteButton from '../../components/projects/deleteButton';
import IntlMessages from '../../components/utility/intlMessages';
import { ProjectsWrapper } from './projects.style';
import notification from '../../components/notification';
import { addProjectToDB, updateProjectInDB, getProjectsFromDB } from './dataHelper';

const {
  changeProject,
  addProject,
  editProject,
  deleteProject,
  viewChange,
  setProjects
} = projectAction;

const { Sider, Content } = Layout;
class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    getProjectsFromDB((projects) => {
      this.props.setProjects(projects);
      this.setState({ loading: false });
    });
  }
  render() {
    const {
      projects,
      selectedId,
      editView,
      changeProject,
      addProject,
      editProject,
      deleteProject,
      viewChange
    } = this.props;
    const selectedProject = selectedId
      ? projects.filter(project => project._id === selectedId)[0]
      : null;
    const onViewChange = () => {
      if (editView) {
        if (selectedProject._id instanceof Date) {
          // Add Project
          addProjectToDB(selectedProject, (response) => {
            notification(response.type, response.message, response.description);
          });
        } else {
          // Update Project
          updateProjectInDB(selectedProject, (response) => {
            notification(response.type, response.message, response.description);
          });
        }
      }
      viewChange(!editView);
    }
    return (
      <ProjectsWrapper
        className="isomorphicProjects"
        style={{ background: 'none' }}
      >
        <Sider width="300" className="isoProjectListBar">
          <ProjectList
            loading={this.state.loading}
            projects={projects}
            selectedId={selectedId}
            changeProject={changeProject}
            deleteProject={deleteProject}
          />
        </Sider>
        <Layout className="isoProjectBoxWrapper">
          {selectedProject
            ? <Content className="isoProjectBox">
              <div className="isoProjectControl">
                <Button type="button" onClick={onViewChange}>
                  {editView
                    ? <Icon type="check" />
                    : <Icon type="edit" />}{' '}
                </Button>
                <DeleteButton
                  deleteProject={deleteProject}
                  project={selectedProject}
                />
                <Button
                  type="primary"
                  onClick={addProject}
                  className="isoAddProjectBtn"
                >
                  <IntlMessages id="projectlist.addNewProject" />
                </Button>
              </div>
              {editView
                ? <EditProjectView
                  project={selectedProject}
                  editProject={editProject}
                />
                : <SingleProjectView
                  project={selectedProject}
                />}
            </Content>
            : <div className="isoProjectControl">
              <Button
                type="primary"
                onClick={addProject}
                className="isoAddProjectBtn"
              >
                <IntlMessages id="projectlist.addNewProject" />
              </Button>
            </div>}
        </Layout>
      </ProjectsWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { projects, selectedId, editView } = state.Projects.toJS();
  return {
    projects,
    selectedId,
    editView,
  };
}
export default connect(mapStateToProps, {
  changeProject,
  addProject,
  editProject,
  deleteProject,
  viewChange,
  setProjects
})(Projects);
