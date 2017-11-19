const switchOptions = [
  {
    id: 'lineNumbers',
    title: 'Line Numbers',
    trueValue: true,
    falseValue: false,
    value: true
  },
  {
    id: 'readOnly',
    title: 'Read Only',
    trueValue: false,
    falseValue: true,
    value: true
  }
];
const selectOptions = [
  {
    id: 'tabSize',
    title: 'Tab Size',
    options: ['2', '4', '6', '8'],
    value: 2
  }
];

const defaultValues = {
  container: `const {
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
      const onViewChange = () => {
        viewChange(!editView);
      }
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
  })(Projects);`,
  component: `import React, { Component } from 'react';
  import IntlMessages from '../utility/intlMessages';
  import { InputSearch } from '../uielements/input';
  import DeleteButton from './deleteButton';
  import { PropTypes } from 'prop-types';
  import { ProjectListWrapper } from './projectList.style';
  
  function filterProjects(projects, search) {
    search = search.toUpperCase();
    return search
      ? projects.filter(project => project.name.toUpperCase().includes(search))
      : projects;
  }
  
  export default class ProjectList extends Component {
    constructor(props) {
      super(props);
      this.singleProject = this.singleProject.bind(this);
      this.onChange = this.onChange.bind(this);
      this.state = {
        search: ''
      };
    }
    singleProject(project) {
      const { selectedId, deleteProject, changeProject } = this.props;
      const activeClass = selectedId === project.id ? 'active' : '';
      const onChange = () => changeProject(project.id);
      return (
        <div
          key={project.id}
          className={'\${activeClass} isoSingleProject'}
          onClick={onChange}
        >
          <div className="isoAvatar">
            {project.avatar ? <img alt="#" src={project.avatar} /> : ''}
          </div>
          <div className="isoProjectName">
            <h3>{project.name ? project.name : 'Untitled Project'}</h3>
          </div>
          <DeleteButton deleteProject={deleteProject} project={project} />
        </div>
      );
    }
    onChange(event) {
      this.setState({ search: event.target.value });
    }
    render() {
      const { search } = this.state;
      const projects = filterProjects(this.props.projects, search);
      return (
        <ProjectListWrapper className="isoProjectListWrapper">
          <InputSearch
            placeholder={this.context.intl.formatMessage({
              id: 'projectlist.searchProjects'
            })}
            value={search}
            onChange={this.onChange}
            className="isoSearchBar"
          />
          {projects && projects.length > 0 ? (
            <div className="isoProjectList">
              {projects.map(project => this.singleProject(project))}
            </div>
          ) : (
            <span className="isoNoResultMsg">
              {<IntlMessages id="Component.projects.noOption" />}
            </span>
          )}
        </ProjectListWrapper>
      );
    }
  }
  
  ProjectList.contextTypes = {
    intl: PropTypes.object.isRequired
  };`,
  redux: `const projectActions = {
    ADD_PROJECT: 'ADD_PROJECT',
    EDIT_PROJECT: 'EDIT_PROJECT',
    DELETE__PROJECT: 'DELETE__PROJECT',
    CHANGE_PROJECT: 'CHANGE_PROJECT',
    EDIT_VIEW: 'EDIT_VIEW',

    changeProject: (id) => ({
      type: projectActions.CHANGE_PROJECT,
      id,
    }),

    addProject: () => {
      const newProject = {
        id: new Date(),
        title: '',
        avatar: '',
        startdate: '',
        enddate: '',
        rateofpay: '',
        status: '',
        notes: ''
      };
      return (dispatch, getState) => {
        dispatch({
          type: projectActions.ADD_PROJECT,
          projects: [...getState().Projects.get('projects'), newProject],
          selectedId: newProject.id,
        });
      };
    },

    editProject: (newProject) => {
      return (dispatch, getState) => {
        const projects = getState().Projects.get('projects');
        const newProjects = [];
        projects.forEach(project => {
          if (project.id === newProject.id) {
            newProjects.push(newProject);
          } else {
            newProjects.push(project);
          }
        });
        dispatch({
          type: projectActions.EDIT_PROJECT,
          projects: newProjects.sort(ascendingSort),
        });
      }
    },

    deleteProject: (id) => {
      return (dispatch, getState) => {
        const projects = getState().Projects.get('projects');
        const selectedId = getState().Projects.get('selectedId');
        const newProjects = [];
        projects.forEach(project => {
          if (project.id === id) {
          } else {
            newProjects.push(project);
          }
        });
        dispatch({
          type: projectActions.DELETE__PROJECT,
          projects: newProjects,
          selectedId: id === selectedId ? undefined : selectedId,
        });
      };
    },

    viewChange: (view) => ({
      type: projectActions.EDIT_VIEW,
      view,
    })

  };

  export default projectActions;`
};

export { switchOptions, selectOptions, defaultValues };
