import { createReducer, current } from "@reduxjs/toolkit";
import {
  filterAction,
  resetAction,
  getFlightsListingAction,
  getFlightsListingSuccess,
  sortAction,
} from "./FlightAction";

const initialState = {
  flightShowData: [],
  flightFullData: [],
  sortedType: null,
};
const flightReducer = createReducer(initialState, (builder) => {
  builder.addCase(getFlightsListingSuccess, (state, action) => {
    console.log("action====>", action);
    return {
      ...state,
      flightShowData: action?.payload,
      flightFullData: action?.payload,
    };
  });
  builder.addCase(filterAction, (state, action) => {
    let filterData = current(state.flightFullData);
    let clonedArr = JSON.parse(JSON.stringify(filterData));
    if (state.sortedType == 1) {
      clonedArr?.sort((a, b) => a.price - b.price);
    } else {
      clonedArr?.sort((a, b) => b.price - a.price);
    }
    let filteredData = clonedArr.filter?.((x) => {
      return action?.payload?.includes(x.airline);
    });

    console.log("filterData", filteredData);
    return {
      ...state,
      flightShowData: filteredData,
    };
  });
  builder.addCase(resetAction, (state, action) => {
    let resetData = current(state.flightFullData);
    let clonedArr = JSON.parse(JSON.stringify(resetData));
    if (state.sortedType == 1) {
      clonedArr?.sort((a, b) => a.price - b.price);
    } else {
      clonedArr?.sort((a, b) => b.price - a.price);
    }
    return {
      ...state,
      flightShowData: clonedArr,
    };
  });
  builder.addCase(sortAction, (state, action) => {
    let sortArr = current(state.flightShowData);
    let clonedArr = JSON.parse(JSON.stringify(sortArr));
    if (action?.payload?.type == 1) {
      clonedArr?.sort((a, b) => a.price - b.price);
    } else {
      clonedArr?.sort((a, b) => b.price - a.price);
    }
    console.log("resetData", clonedArr);
    return {
      ...state,
      flightShowData: clonedArr,
      sortedType: action.payload.type,
    };
  });
});
export default flightReducer;
