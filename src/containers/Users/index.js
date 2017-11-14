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
import { setInterval } from 'timers';

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
  }

  loadUsersFromServer() {
    fetch('https://us-central1-react-dojo-demo.cloudfunctions.net/app/users/')
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
      ? users.filter(user => user.id === selectedId)[0]
      : null;
    const onViewChange = () => viewChange(!editView);
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
