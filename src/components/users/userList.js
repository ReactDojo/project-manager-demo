import React, { Component } from 'react';
import IntlMessages from '../utility/intlMessages';
import { InputSearch } from '../uielements/input';
import DeleteButton from './deleteButton';
import { PropTypes } from 'prop-types';
import { UserListWrapper } from './userList.style';
import Spin from '../../containers/Feedback/Spin/spin.style';

function filterUsers(users, search) {
  search = search.toUpperCase();
  return search
    ? users.filter(user => user.name.toUpperCase().includes(search))
    : users;
}

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.singleUser = this.singleUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: ''
    };
  }
  singleUser(user) {
    const { selectedId, deleteUser, deleteUserDataOnServer, changeUser } = this.props;
    const activeClass = selectedId === user._id ? 'active' : '';
    const onChange = () => changeUser(user._id);
    return (
      <div
        key={user._id}
        className={`${activeClass} isoSingleUser`}
        onClick={onChange}
      >
        <div className="isoAvatar">
          {user.avatar ? <img alt="#" src={user.avatar} /> : ''}
        </div>
        <div className="isoUserName">
          <h3>{user.name ? user.name : 'No Name'}</h3>
        </div>
        <DeleteButton deleteUser={deleteUser} deleteUserDataOnServer={deleteUserDataOnServer} user={user} />
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const users = filterUsers(this.props.users, search);
    return (
      <UserListWrapper className="isoUserListWrapper">
        <InputSearch
          placeholder={this.context.intl.formatMessage({
            id: 'userlist.searchUsers'
          })}
          value={search}
          onChange={this.onChange}
          className="isoSearchBar"
        />
        {users && users.length > 0 ? (
          <div className="isoUserList">
            {users.map(user => this.singleUser(user))}
          </div>
        ) : (
            <span className="isoNoResultMsg">
              {this.props.loading ? (
                <div><Spin size="small" />&nbsp;&nbsp;&nbsp;Loading..</div>
              ) : (
                <IntlMessages id="Component.users.noOption" />
              )}
            </span>
          )}
      </UserListWrapper>
    );
  }
}

UserList.contextTypes = {
  intl: PropTypes.object.isRequired
};
