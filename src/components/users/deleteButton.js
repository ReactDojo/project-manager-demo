import React, { Component } from 'react';
import Popconfirm from '../feedback/popconfirm';
import Button from '../uielements/button';
import notification from '../notification';

export default class DeleteButton extends Component {
  render() {
    const { user, deleteUser, deleteUserDataOnServer } = this.props;
    let name = '';
    if (user.firstName) {
      name = `${user.firstName} `;
    }
    if (user.lastName) {
      name = `${name}${user.lastName}`;
    }
    if (!name) {
      name = 'No Name';
    }
    return (
      <Popconfirm
        title={`Sure to delete ${name}?`}
        okText="DELETE"
        cancelText="No"
        onConfirm={() => {
          notification('error', `Deleted ${name}`, '');
          deleteUser(user._id);
          deleteUserDataOnServer(user._id);
        }}
      >
        <Button icon="close" type="button" className="isoDeleteBtn" />
      </Popconfirm>
    );
  }
}
