import { Map } from "immutable";
import getData from "../../containers/Users/getData";
import userActions from "./actions";

const users = [];

const initState = new Map({
  users,
  selectedId: 0,
  editView: false
});

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case userActions.CHANGE_USER:
      return state.set("selectedId", action.id).set("editView", false);
    case userActions.ADD_USER:
      return state
        .set("users", action.users)
        .set("selectedId", action.selectedId)
        .set("editView", true);
    case userActions.EDIT_USER:
      return state.set("users", action.users);
    case userActions.DELETE__USER:
      return state
        .set("users", action.users)
        .set("selectedId", action.selectedId);
    case userActions.EDIT_VIEW:
      return state.set("editView", action.view);
    case userActions.SET_USERS:
      return state.set("users", action.users);
    default:
      return state;
  }
}

export { users };
