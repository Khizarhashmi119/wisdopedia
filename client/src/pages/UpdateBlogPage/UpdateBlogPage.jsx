import BlogForm from "../../components/BlogForm/BlogForm";

import "./UpdateBlogPage.css";

const UpdateBlogPage = ({ match }) => {
  return (
    <div className="update-blog">
      <div className="container">
        <h1 className="update-blog-title">Edit project</h1>
        <BlogForm />
      </div>
    </div>
  );
};

export default UpdateBlogPage;
