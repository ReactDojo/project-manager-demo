function ascendingSort(user1, user2) {
  const name1 = user1.name ? user1.name.toUpperCase() : '~';
  const name2 = user2.name ? user2.name.toUpperCase() : '~';
  return name1 > name2 ? 1 : name1 === name2 ? 0 : -1;
}

const userActions = {
  ADD_USER: 'ADD_USER',
  EDIT_USER: 'EDIT_USER',
  DELETE__USER: 'DELETE__USER',
  CHANGE_USER: 'CHANGE_USER',
  EDIT_VIEW: 'EDIT_VIEW',
  SET_USERS: 'SET_USERS',
  changeUser: (id) => ({
    type: userActions.CHANGE_USER,
    id,
  }),
  addUser: () => {
    const newUser = {
      _id: new Date(),
      firstName: '',
      avatar: 'http://i.imgur.com/hfH9CiC.png',
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
        type: userActions.ADD_USER,
        users: [...getState().Users.get('users'), newUser],
        selectedId: newUser._id,
      });
    };
  },
  editUser: (newUser) => {
    return (dispatch, getState) => {
      const users = getState().Users.get('users');
      const newUsers = [];
      users.forEach(user => {
        if (user._id === newUser._id) {
          newUsers.push(newUser);
        } else {
          newUsers.push(user);
        }
      });
      dispatch({
        type: userActions.EDIT_USER,
        users: newUsers.sort(ascendingSort),
      });
    }
  },
  deleteUser: (id) => {
    return (dispatch, getState) => {
      const users = getState().Users.get('users');
      const selectedId = getState().Users.get('selectedId');
      const newUsers = [];
      users.forEach(user => {
        if (user._id === id) {
        } else {
          newUsers.push(user);
        }
      });
      dispatch({
        type: userActions.DELETE__USER,
        users: newUsers,
        selectedId: id === selectedId ? undefined : selectedId,
      });
    };
  },
  viewChange: (view) => ({
    type: userActions.EDIT_VIEW,
    view,
  }),
  setUsers: (users) => {
    return (dispatch, getState) => {
      dispatch({
        type: userActions.SET_USERS,
        users
      });
    }
  }
};
export default userActions;