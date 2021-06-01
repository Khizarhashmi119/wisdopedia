import { useHistory } from "react-router-dom";

import AddCategoryForm from "../../components/AddCategoryForm/AddCategoryForm";
import DashboardCategoryList from "../../components/DashboardCategoryList/DashboardCategoryList";
import DashboardBlogsList from "../../components/DashboardBlogsList/DashboardBlogsList";
import DashboardCommentsList from "../../components/DashboardCommentsList/DashboardCommentsList";
import Alerts from "../../components/Alerts/Alerts";

import "./DashboardPage.css";

const DashboardPage = () => {
  const { push } = useHistory();

  const handleClick = () => {
    push("/blogs/add");
  };

  return (
    <div className="dashboard-page">
      <div className="categories-section">
        <AddCategoryForm />
        <DashboardCategoryList />
      </div>

      <div className="blogs-section">
        <button className="add-blog-btn" onClick={handleClick}>
          <i className="fas fa-plus"></i> Blog
        </button>
        <DashboardBlogsList />
      </div>

      <div className="comments-section">
        <DashboardCommentsList />
      </div>
      <Alerts />
    </div>
  );
};

export default DashboardPage;
