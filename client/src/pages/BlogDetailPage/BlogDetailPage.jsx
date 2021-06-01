import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import AddCommentForm from "../../components/AddCommentForm/AddCommentForm";
import CommentList from "../../components/CommentList/CommentList";
import ShareButtons from "../../components/ShareButtons/ShareButtons";
import Alerts from "../../components/Alerts/Alerts";
import { getBlogCommentsAction } from "../../redux/actions/commentsActions";
import { getBlogAction } from "../../redux/actions/blogsActions";

import "./BlogDetailPage.css";

const BlogDetailPage = () => {
  const { id } = useParams();
  const { blog, isLoading: isBlogLoading } = useSelector(
    (state) => state.blogsState
  );
  const { comments, isLoading: isCommentsLoading } = useSelector(
    (state) => state.commentsState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogAction(id));
    dispatch(getBlogCommentsAction(id));
  }, [dispatch, id]);

  const blogUrl = document.location.href;
  const baseURL =
    process.env.NODE_ENV === "production"
      ? "/api/v1"
      : "http://localhost:5000/api/v1";

  return (
    <div className="blog-detail-page">
      {!isBlogLoading ? (
        blog ? (
          <div className="blog-content">
            <img
              className="blog-main-image"
              src={`${baseURL}/${blog.imageName}`}
              alt="blog-title"
            />
            <div className="blog-info-container">
              <div>
                <div className="blog-date">
                  Date: {moment(blog.updatedAt).format("MMMM Do YYYY")}
                </div>
                <div className="blog-author-name">By: {blog.author}</div>
              </div>
              <ShareButtons blog={blog} blogUrl={blogUrl} />
            </div>
            <div className="blog-category-name">
              Category: {blog.categories.map(({ name }) => name).join(", ")}
            </div>
            <h2 className="blog-title">{blog.title}</h2>
            <div
              className="blog-body"
              dangerouslySetInnerHTML={{ __html: blog.body }}
            ></div>
            <AddCommentForm blogId={blog._id} />
          </div>
        ) : (
          <h2 className="loading-text">Loading...</h2>
        )
      ) : (
        <h2 className="loading-text">Loading...</h2>
      )}
      {!isCommentsLoading ? (
        <CommentList comments={comments} />
      ) : (
        <h2 className="loading-text">Loading...</h2>
      )}
      <div>
        <h3>Side section</h3>
      </div>
      <Alerts />
    </div>
  );
};

export default BlogDetailPage;
