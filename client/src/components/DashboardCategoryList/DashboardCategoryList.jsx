import { Fragment } from "react";
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
            {categories.map((category) => (
              <DashboardCategory key={category._id} category={category} />
            ))}
          </ul>
        ) : (
          <h2 className="message">No category yet.</h2>
        )
      ) : (
        <h2 className="loading-text">Loading...</h2>
      )}
    </Fragment>
  );
};

export default DashboardCategoryList;
