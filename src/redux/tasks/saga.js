import { all, takeEvery, fork } from 'redux-saga/effects';
import actions from './actions';

export function* changedTask() {
  yield takeEvery(actions.CHANGE_TASK, function*() {});
}
export default function* rootSaga() {
  yield all([fork(changedTask)]);
}
