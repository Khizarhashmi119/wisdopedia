import BlogForm from "../../components/BlogForm/BlogForm";

import "./UpdateBlogPage.css";

const UpdateBlogPage = () => {
  return (
    <div className="update-blog">
      <h1 className="update-blog-title">Edit blog</h1>
      <BlogForm />
    </div>
  );
};

export default UpdateBlogPage;
