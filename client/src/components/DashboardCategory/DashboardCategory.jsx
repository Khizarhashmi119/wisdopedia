import React from "react";
import { useDispatch } from "react-redux";

import { deleteCategoryAction } from "../../store/actions/categoriesActions";

import "./DashboardCategory.css";

const DashboardCategory = ({ id, name }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteCategoryAction(id));
  };

  return (
    <li className="dashboard-category">
      #{name}{" "}
      <i
        className="fas fa-times delete-category-icon"
        onClick={handleClick}
      ></i>
    </li>
  );
};

export default DashboardCategory;
