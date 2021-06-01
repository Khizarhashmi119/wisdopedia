import * as alertsActionTypes from "../actionTypes/alertActionTypes";

const initState = {
  alerts: [],
};

const alertsReducer = (state = initState, action) => {
  switch (action.type) {
    case alertsActionTypes.ADD_ALERT:
      return {
        alerts: [...state.alerts, action.alert],
      };
    case alertsActionTypes.DELETE_ALERT:
      return {
        alerts: state.alerts.filter((alert) => alert.id !== action.id),
      };
    default:
      return state;
  }
};

export default alertsReducer;
