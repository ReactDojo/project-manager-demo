import React, { Component } from 'react';
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
    const { seectedId, deleteProject, changeProject } = this.props;
    const activeClass = seectedId === project.id ? 'active' : '';
    const onChange = () => changeProject(project.id);
    return (
      <div
        key={project.id}
        className={`${activeClass} isoSingleProject`}
        onClick={onChange}
      >
        <div className="isoAvatar">
          {project.avatar ? <img alt="#" src={project.avatar} /> : ''}
        </div>
        <div className="isoProjectName">
          <h3>{project.name ? project.name : 'No Name'}</h3>
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
};
