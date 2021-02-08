import React from "react";
import DashboardBlogsList from "../../components/DashboardBlogsList/DashboardBlogsList";

import "./DashboardPage.css";

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="blog-section">
        <button className="add-blog-btn">
          <i className="fas fa-plus"></i> Blog
        </button>
        <DashboardBlogsList />
      </div>
      <div className="comments-section"></div>
    </div>
  );
};

export default DashboardPage;
