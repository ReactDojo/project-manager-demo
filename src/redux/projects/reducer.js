import { Map } from "immutable";
import projectActions from "./actions";

const projects = [];

const initState = new Map({
  projects,
  selectedId: 0,
  editView: false
});

export default function projectReducer(state = initState, action) {
  switch (action.type) {
    case projectActions.CHANGE_PROJECT:
      return state.set("selectedId", action.id).set("editView", false);
    case projectActions.ADD_PROJECT:
      return state
        .set("projects", action.projects)
        .set("selectedId", action.selectedId)
        .set("editView", true);
    case projectActions.EDIT_PROJECT:
      return state.set("projects", action.projects);
    case projectActions.DELETE__PROJECT:
      return state
        .set("projects", action.projects)
        .set("selectedId", action.selectedId);
    case projectActions.EDIT_VIEW:
      return state.set("editView", action.view);
    case projectActions.SET_PROJECTS:
      return state.set("projects", action.projects);
    default:
      return state;
  }
}

export { projects };
