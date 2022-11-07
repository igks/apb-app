import { spawn } from "redux-saga/effects";

import anggaranSaga from "redux/sagas/anggaran-saga";

export default function* rootSaga() {
  yield spawn(anggaranSaga);
}
