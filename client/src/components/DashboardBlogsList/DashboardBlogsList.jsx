import { Fragment } from "react";
import { useSelector } from "react-redux";

import DashboardBlog from "../DashboardBlog/DashboardBlog";

import "./DashboardBlogsList.css";

const DashboardBlogsList = () => {
  const { blogs, isLoading } = useSelector((state) => state.blogsState);

  return (
    <Fragment>
      {!isLoading ? (
        blogs.length !== 0 ? (
          <ul className="dashboard-blogs-list">
            {blogs.map((blog, index) => (
              <DashboardBlog key={blog._id} blog={blog} index={index} />
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
