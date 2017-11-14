import { all, takeEvery, fork } from 'redux-saga/effects';
import actions from './actions';

export function* addUser() {
  yield takeEvery(actions.ADD_USER, function*() {});
}
export function* editUser() {
  yield takeEvery(actions.EDIT_USER, function*() {});
}
export function* deleteUser() {
  yield takeEvery(actions.DELETE__USER, function*() {});
}
export default function* rootSaga() {
  yield all([fork(addUser), fork(editUser), fork(deleteUser)]);
}
