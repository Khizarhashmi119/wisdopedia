import { useDispatch } from "react-redux";

import * as alertActionTypes from "../../redux/actionTypes/alertActionTypes";

import "./Alert.css";

const Alert = ({ alert: { id, msg, type } }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: alertActionTypes.DELETE_ALERT,
      id,
    });
  };

  return (
    <div key={id} className={`alert-box ${type}`}>
      <div>{msg}</div> <i className="fas fa-times" onClick={handleClick}></i>
    </div>
  );
};

export default Alert;
