import React, { Component } from 'react';
import { connect } from 'react-redux';
import projectAction from '../../redux/projects/actions';
import { Layout, Icon } from 'antd';
import Button from '../../components/uielements/button';
import ProjectList from '../../components/projects/projectList';
import SingleProjectView from '../../components/projects/singleView';
import EditProjectView from '../../components/projects/editView';
import DeleteButton from '../../components/projects/deleteButton';
import { otherAttributes } from './fakeData';
import IntlMessages from '../../components/utility/intlMessages';
import { ProjectsWrapper } from './projects.style';

const {
  changeProject,
  addProject,
  editProject,
  deleteProject,
  viewChange,
} = projectAction;

const { Sider, Content } = Layout;
class Projects extends Component {
  render() {
    const {
      projects,
      selectedId,
      editView,
      changeProject,
      addProject,
      editProject,
      deleteProject,
      viewChange,
    } = this.props;
    const selectedProject = selectedId
      ? projects.filter(project => project.id === selectedId)[0]
      : null;
    const onVIewChange = () => viewChange(!editView);
    return (
      <ProjectsWrapper
        className="isomorphicProjects"
        style={{ background: 'none' }}
      >
        <Sider width="300" className="isoProjectListBar">
          <ProjectList
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
                  <Button type="button" onClick={onVIewChange}>
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
                      otherAttributes={otherAttributes}
                    />
                  : <SingleProjectView
                      project={selectedProject}
                      otherAttributes={otherAttributes}
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
})(Projects);
