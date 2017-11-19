import React, { Component } from 'react';
import Popconfirm from '../feedback/popconfirm';
import Button from '../uielements/button';
import notification from '../notification';
import { deleteProjectFromDB } from '../../containers/Projects/dataHelper';

export default class DeleteButton extends Component {
  render() {
    const { project, deleteProject } = this.props;
    let name = project.title || 'Untitled Project';
    return (
      <Popconfirm
        title={`Sure to delete ${name}?`}
        okText="DELETE"
        cancelText="No"
        onConfirm={() => {
          deleteProject(project._id);
          deleteProjectFromDB(project, (response) => {
            notification(response.type, response.message, response.description);
          });
        }}
      >
        <Button icon="close" type="button" className="isoDeleteBtn" />
      </Popconfirm>
    );
  }
}
