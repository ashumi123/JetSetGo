import { all } from "redux-saga/effects";
import sagaFlights from "../module/FlightSaga";

export default function* rootSaga() {
  yield all([
    sagaFlights()
  ]);
}
