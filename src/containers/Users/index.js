import React, { Component } from 'react';
import { connect } from 'react-redux';
import userAction from '../../redux/users/actions';
import { Layout, Icon } from 'antd';
import Button from '../../components/uielements/button';
import UserList from '../../components/users/userList';
import SingleUserView from '../../components/users/singleView';
import EditUserView from '../../components/users/editView';
import DeleteButton from '../../components/users/deleteButton';
import { otherAttributes } from './getData';
import IntlMessages from '../../components/utility/intlMessages';
import { UsersWrapper } from './users.style';
import apiUrl from '../../config'

const {
  changeUser,
  addUser,
  editUser,
  deleteUser,
  viewChange,
  setUsers
} = userAction;

const { Sider, Content } = Layout;
class Users extends Component {
  constructor(props) {
    super(props);
    this.loadUsersFromServer = this.loadUsersFromServer.bind(this);
    this.updateUserDataOnServer = this.updateUserDataOnServer.bind(this);
    this.addUserDataOnServer = this.addUserDataOnServer.bind(this);
    this.deleteUserDataOnServer = this.deleteUserDataOnServer.bind(this);
  }

  loadUsersFromServer() {
    fetch(`${apiUrl}/users`)
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed")
        }
        return response
      })
      .then(d => d.json())
      .then(users => {
        this.props.setUsers(users);
      });
  }

  updateUserDataOnServer(user) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch(`${apiUrl}/user/${user._id}`, {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(user)
    }).then(response => {
      if (!response.ok) {
        console.log(response);
      }
      return response
    }).then(d => d.json())
      .then(users => {
        console.log(users);
      });
  }

  deleteUserDataOnServer(user_id) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch(`${apiUrl}/user/${user_id}`, {
      method: "DELETE",
      headers: myHeaders
    }).then(response => {
      if (!response.ok) {
        console.log(response);
      }
      return response
    }).then(d => d.json())
      .then(users => {
        console.log(users);
      });
  }

  addUserDataOnServer(user) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(user)
    }).then(response => {
      if (!response.ok) {
        console.log(response);
      }
      return response
    }).then(d => d.json())
      .then(users => {
        console.log(users);
      });
  }

  componentDidMount() {
    this.loadUsersFromServer();
    //setInterval(this.loadUsersFromServer, 2000);
  }

  render() {
    const {
      users,
      selectedId,
      editView,
      changeUser,
      addUser,
      editUser,
      deleteUser,
      viewChange
    } = this.props;
    const selectedUser = selectedId
      ? users.filter(user => user._id === selectedId)[0]
      : null;
    const onViewChange = () => {
      if (editView) {
        if (selectedUser._id instanceof Date) {
          this.addUserDataOnServer(selectedUser);
        } else {
          this.updateUserDataOnServer(selectedUser);
        }
      }
      viewChange(!editView);
    }
    return (
      <UsersWrapper
        className="isomorphicUsers"
        style={{ background: 'none' }}
      >
        <Sider width="300" className="isoUserListBar">
          <UserList
            users={users}
            selectedId={selectedId}
            changeUser={changeUser}
            deleteUser={deleteUser}
            deleteUserDataOnServer={this.deleteUserDataOnServer}
          />
        </Sider>
        <Layout className="isoUserBoxWrapper">
          {selectedUser
            ? <Content className="isoUserBox">
              <div className="isoUserControl">
                <Button type="button" onClick={onViewChange}>
                  {editView
                    ? <Icon type="check" />
                    : <Icon type="edit" />}{' '}
                </Button>
                <DeleteButton
                  deleteUserDataOnServer={this.deleteUserDataOnServer}
                  deleteUser={deleteUser}
                  user={selectedUser}
                />
                <Button
                  type="primary"
                  onClick={addUser}
                  className="isoAddUserBtn"
                >
                  <IntlMessages id="userlist.addNewUser" />
                </Button>
              </div>
              {editView
                ? <EditUserView
                  user={selectedUser}
                  editUser={editUser}
                  otherAttributes={otherAttributes}
                />
                : <SingleUserView
                  user={selectedUser}
                  otherAttributes={otherAttributes}
                />}
            </Content>
            : <div className="isoUserControl">
              <Button
                type="primary"
                onClick={addUser}
                className="isoAddUserBtn"
              >
                <IntlMessages id="userlist.addNewUser" />
              </Button>
            </div>}
        </Layout>
      </UsersWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { users, selectedId, editView } = state.Users.toJS();
  return {
    users,
    selectedId,
    editView,
  };
}
export default connect(mapStateToProps, {
  changeUser,
  addUser,
  editUser,
  deleteUser,
  viewChange,
  setUsers
})(Users);
