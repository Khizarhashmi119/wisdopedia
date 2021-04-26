import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import DashboardCategory from "../DashboardCategory/DashboardCategory";

import "./DashboardCategoryList.css";

const DashboardCategoryList = () => {
  const { categories, isloading } = useSelector(
    (state) => state.categoriesState
  );

  return (
    <Fragment>
      {!isloading ? (
        categories.length !== 0 ? (
          <ul className="dashboard-categories-list">
            {categories.map(({ _id, ...otherProps }) => (
              <DashboardCategory key={_id} id={_id} {...otherProps} />
            ))}
          </ul>
        ) : (
          <h2 className="message">No skill yet.</h2>
        )
      ) : (
        <h2 className="message">Loading...</h2>
      )}
    </Fragment>
  );
};

export default DashboardCategoryList;
