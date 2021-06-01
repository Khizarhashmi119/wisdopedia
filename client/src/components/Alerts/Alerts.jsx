import React from "react";
import { useSelector } from "react-redux";

import "./Alerts.css";

const Alerts = () => {
  const { alerts } = useSelector((state) => state.alertsState);

  return (
    <div className="alerts">
      {alerts.length
        ? alerts.map((alert) => (
            <div key={alert.id} className={`alert-box ${alert.type}`}>
              <span>{alert.msg}</span>
            </div>
          ))
        : null}
    </div>
  );
};

export default Alerts;
