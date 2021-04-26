import React from "react";

import AddCategoryForm from "../../components/AddCategoryForm/AddCategoryForm";
import DashboardCategoryList from "../../components/DashboardCategoryList/DashboardCategoryList";
import DashboardBlogsList from "../../components/DashboardBlogsList/DashboardBlogsList";
import DashboardCommentsList from "../../components/DashboardCommentList/DashboardCommentList";

import "./DashboardPage.css";

const DashboardPage = ({ history }) => {
  const handleClick = () => {
    history.push("/blogs/add");
  };

  return (
    <div className="dashboard-page">
      <div className="categories-section">
        <AddCategoryForm />
        <DashboardCategoryList />
      </div>

      <div className="blog-section">
        <button className="add-blog-btn" onClick={handleClick}>
          <i className="fas fa-plus"></i> Blog
        </button>
        <DashboardBlogsList />
      </div>

      <div className="comments-section">
        <DashboardCommentsList />
      </div>
    </div>
  );
};

export default DashboardPage;
