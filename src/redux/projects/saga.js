import { all, takeEvery, fork } from 'redux-saga/effects';
import actions from './actions';

export function* addProject() {
  yield takeEvery(actions.ADD_PROJECT, function*() {});
}
export function* editProject() {
  yield takeEvery(actions.EDIT_PROJECT, function*() {});
}
export function* deleteProject() {
  yield takeEvery(actions.DELETE__PROJECT, function*() {});
}
export default function* rootSaga() {
  yield all([fork(addProject), fork(editProject), fork(deleteProject)]);
}
