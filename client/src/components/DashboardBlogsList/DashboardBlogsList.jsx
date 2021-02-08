import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import DashboardBlog from "../DashboardBlog/DashboardBlog";

import "./DashboardBlogsList.css";

const DashboardBlogsList = () => {
  const { blogs, loading } = useSelector((state) => state.blogsState);

  return (
    <Fragment>
      {!loading ? (
        blogs.length !== 0 ? (
          <ul className="dashboard-blogs-list">
            {blogs.map(({ _id, ...otherProps }, index) => (
              <DashboardBlog key={_id} id={_id} {...otherProps} index={index} />
            ))}
          </ul>
        ) : (
          <h2 className="message">No blog yet.</h2>
        )
      ) : (
        <h2 className="loading-text">Loading...</h2>
      )}
    </Fragment>
  );
};

export default DashboardBlogsList;
