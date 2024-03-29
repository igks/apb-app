import { takeEvery } from "redux-saga/effects";

import {
  GET_ANGGARAN_HEADER_REQUESTED,
  GET_ANGGARAN_REQUESTED,
} from "redux/actions/anggaran-action";

// import { calculateTotal, loadAnggaranList, loadConfig } from "services/budget";

function* getAnggaran({ payload }) {
  // try {
  //   const { bulan } = payload;
  //   yield put({ type: GET_ANGGARAN });
  //   const anggaran = yield call(loadAnggaranList, bulan);
  //   yield put({ type: RECEIVE_ANGGARAN, payload: anggaran });
  // } catch (err) {
  //   console.log(err);
  // }
}

function* getConfig({ payload }) {
  // const { records } = payload;
  // yield put({ type: GET_ANGGARAN_HEADER });
  // const { data } = yield call(loadConfig);
  // const { sum, used } = calculateTotal(records);
  // const newHeader = {
  //   id: data.id,
  //   income: data.income,
  //   carryForward: data.carryForward,
  //   sum,
  //   used,
  // };
  // yield put({ type: RECEIVE_ANGGARAN_HEADER, payload: newHeader });
}

export default function* anggaranSaga() {
  yield takeEvery(GET_ANGGARAN_REQUESTED, getAnggaran);
  yield takeEvery(GET_ANGGARAN_HEADER_REQUESTED, getConfig);
}
