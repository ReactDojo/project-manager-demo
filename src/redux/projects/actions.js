function ascendingSort(project1, project2) {
  const name1 = project1.name ? project1.name.toUpperCase() : '~';
  const name2 = project2.name ? project2.name.toUpperCase() : '~';
  return name1 > name2 ? 1 : name1 === name2 ? 0 : -1;
}

const projectActions = {
  ADD_PROJECT: 'ADD_PROJECT',
  EDIT_PROJECT: 'EDIT_PROJECT',
  DELETE__PROJECT: 'DELETE__PROJECT',
  CHANGE_PROJECT: 'CHANGE_PROJECT',
  SET_PROJECTS: 'SET_PROJECTS',
  EDIT_VIEW: 'EDIT_VIEW',
  changeProject: (id) => ({
    type: projectActions.CHANGE_PROJECT,
    id,
  }),
  addProject: () => {
    const newProject = {
      _id: new Date(),
      title: '',
      avatar: 'https://www.naplesgarden.org/wp-content/themes/naples_botanical/img/notfound.jpg',
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
        selectedId: newProject._id,
      });
    };
  },
  editProject: (newProject) => {
    return (dispatch, getState) => {
      const projects = getState().Projects.get('projects');
      const newProjects = [];
      projects.forEach(project => {
        if (project._id === newProject._id) {
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
        if (project._id === id) {
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
  }),
  setProjects: (projects) => {
    return (dispatch, getState) => {
      dispatch({
        type: projectActions.SET_PROJECTS,
        projects
      });
    }
  }
};
export default projectActions;