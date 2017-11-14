import { Map } from "immutable";
import fakeData from "../../containers/Projects/fakeData";
import projectActions from "./actions";

const projects = new fakeData(10).getAll();

const initState = new Map({
  projects,
  selectedId: projects[0].id,
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
    default:
      return state;
  }
}

export { projects };
