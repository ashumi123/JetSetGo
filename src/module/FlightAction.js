import { createAction } from "@reduxjs/toolkit";

export const getFlightsListingAction = createAction(
    "request/getFlightsListingAction"
  );
export const getFlightsListingSuccess = createAction(
    "request/getFlightsListingSuccess"
  );
export const filterAction = createAction(
    "request/filterAction"
  );
export const resetAction = createAction(
    "request/resetAction"
  );
export const sortAction = createAction(
    "request/sortAction"
  );