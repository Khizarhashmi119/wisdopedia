import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import BlogForm from "../../components/layout/BlogForm/BlogForm";
import { getBlogAction } from "../../redux/actions/blogsActions";

import "./UpdateBlogPage.css";

const UpdateBlogPage = () => {
  const { id } = useParams();
  const { blog, isLoading } = useSelector((state) => state.blogsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogAction(id));
  }, [dispatch, id]);

  return (
    <div className="update-blog">
      <h1 className="update-blog-title">Edit blog</h1>
      {!isLoading ? <BlogForm blog={blog} /> : <h2>Loading...</h2>}
    </div>
  );
};

export default UpdateBlogPage;
