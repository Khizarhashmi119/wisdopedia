import React from "react";
import { useSelector } from "react-redux";

import Alert from "../Alert/Alert";

import "./Alerts.css";

const Alerts = () => {
  const { alerts } = useSelector((state) => state.alertsState);

  return (
    <div className="alerts">
      {alerts.length ? alerts.map((alert) => <Alert alert={alert} />) : null}
    </div>
  );
};

export default Alerts;
