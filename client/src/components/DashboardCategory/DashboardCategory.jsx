import { useDispatch } from "react-redux";

import { deleteCategoryAction } from "../../store/actions/categoriesActions";

import "./DashboardCategory.css";

const DashboardCategory = ({ category: { _id, name } }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const answer = window.confirm(
      `Do you want to permanently delete ${name} category ?`
    );
    if (answer) {
      dispatch(deleteCategoryAction(_id));
    }
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
