import { useState } from "react";
import { useDispatch } from "react-redux";

import { addCategoryAction } from "../../../redux/actions/categoriesActions";

import "./AddCategoryForm.css";

const AddCategoryForm = () => {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    setCategory(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategoryAction(category));
    setCategory("");
  };

  return (
    <form className="skill-form" onSubmit={handleSubmit}>
      <input
        className="input-category"
        type="text"
        value={category}
        id="skill"
        placeholder="Enter category name"
        required
        onChange={handleChange}
      />
      <button className="add-category-btn" disabled={!category} type="submit">
        <i className="fas fa-plus"></i>
      </button>
    </form>
  );
};

export default AddCategoryForm;
