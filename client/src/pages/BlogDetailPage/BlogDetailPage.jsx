import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import AddCommentForm from "../../components/AddCommentForm/AddCommentForm";
import CommentList from "../../components/CommentList/CommentList";
import ShareButtons from "../../components/ShareButtons/ShareButtons";
import { getBlogCommentsAction } from "../../store/actions/commentsActions";
import { getBlogAction } from "../../store/actions/blogsActions";

import BlogImage from "../../images/blog.jpg";

import "./BlogDetailPage.css";

const BlogDetailPage = () => {
  const { id } = useParams();
  const { blog, isLoading } = useSelector((state) => state.blogsState);
  const { comments } = useSelector((state) => state.commentsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogAction(id));
    dispatch(getBlogCommentsAction(id));
  }, [dispatch, id]);

  const blogUrl = document.location.href;

  return (
    <div className="blog-detail-page">
      {!isLoading ? (
        blog ? (
          <Fragment>
            <img className="blog-main-image" src={BlogImage} alt="blog-title" />
            <div className="blog-date">
              Date: {moment(blog.updatedAt).format("MMMM Do YYYY, h:mm a")}
            </div>
            <div className="blog-author-name">Author: {blog.author}</div>
            <div className="blog-category-name">
              Category: {blog.categories.map(({ name }) => name).join(", ")}
            </div>
            <div className="row">
              <div className="col-1">
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-body">{blog.body}</p>
                <ShareButtons blog={blog} blogUrl={blogUrl} />
                <AddCommentForm blogId={blog._id} />
                <CommentList comments={comments} />
              </div>
              <div className="col-2">
                <h3>Side section</h3>
              </div>
            </div>
          </Fragment>
        ) : (
          <h2 className="loading-text">Loading...</h2>
        )
      ) : (
        <h2 className="loading-text">Loading...</h2>
      )}
    </div>
  );
};

export default BlogDetailPage;
