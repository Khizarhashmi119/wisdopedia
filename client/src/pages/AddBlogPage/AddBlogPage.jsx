import BlogForm from "../../components/BlogForm/BlogForm";

import "./AddBlogPage.css";

const AddBlogPage = () => {
  return (
    <div className="add-blog">
      <h1 className="add-blog-title">Add blog</h1>
      <BlogForm />
    </div>
  );
};

export default AddBlogPage;
