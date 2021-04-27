import BlogForm from "../../components/BlogForm/BlogForm";

import "./AddBlogPage.css";

const AddBlogPage = () => {
  return (
    <div className="add-blog">
      <h1 className="add-blog-title">Add project</h1>
      <BlogForm />
    </div>
  );
};

export default AddBlogPage;
