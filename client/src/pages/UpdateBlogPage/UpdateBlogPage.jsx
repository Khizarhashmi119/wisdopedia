import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import BlogForm from "../../components/BlogForm/BlogForm";
import Alerts from "../../components/Alerts/Alerts";
import { getBlogAction } from "../../redux/actions/blogsActions";

import "./UpdateBlogPage.css";

const UpdateBlogPage = () => {
  const { slug } = useParams();
  const { blog, isLoading } = useSelector((state) => state.blogsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogAction(slug));
  }, [dispatch, slug]);

  return (
    <div className="update-blog">
      <h1 className="update-blog-title">Edit blog</h1>
      {!isLoading ? <BlogForm blog={blog} /> : <h2>Loading...</h2>}
      <Alerts />
    </div>
  );
};

export default UpdateBlogPage;
