import { apirequest } from "../config/Api";
import { call, put, takeEvery } from "redux-saga/effects";
import { getFlightsListingAction, getFlightsListingSuccess } from "./FlightAction";

function* getFlightsListingSaga({ payload }) {
    try {
      const response = yield call(apirequest);
      if (response && response.message == "Success") {
        payload.callback(response);
        yield put(getFlightsListingSuccess(response))
      } else {
        payload.callback("error");
      }
    } catch (error) {
      payload.callback("error");
      alert(error);
    }
  }

  function* sagaFlights() {
    yield takeEvery(getFlightsListingAction, getFlightsListingSaga);
  }
  export default sagaFlights;