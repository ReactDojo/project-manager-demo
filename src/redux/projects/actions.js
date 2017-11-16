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
  EDIT_VIEW: 'EDIT_VIEW',
  changeProject: (id) => ({
    type: projectActions.CHANGE_PROJECT,
    id,
  }),
  addProject: () => {
    const newProject = {
      id: new Date(),
      firstName: '',
      avatar: 'https://www.naplesgarden.org/wp-content/themes/naples_botanical/img/notfound.jpg',
      LastName: '',
      mobile: '',
      home: '',
      name: '',
      company: '',
      work: '',
      note: '',
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
  }),
};
export default projectActions;