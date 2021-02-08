import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import AddCommentForm from "../../components/AddCommentForm/AddCommentForm";
import CommentList from "../../components/CommentList/CommentList";

import BlogImage from "../../images/blog.jpg";

import "./BlogDetailPage.css";

const BlogDetailPage = ({
  match: {
    params: { id },
  },
}) => {
  const { blogs, isLoading } = useSelector((state) => state.blogsState);
  const blog = blogs.find((blog) => blog._id === id);
  const blogUrl = document.location.href;

  return (
    <div className="blog-detail-page">
      {!isLoading ? (
        blog ? (
          <Fragment>
            <img className="blog-main-image" src={BlogImage} alt="blog-title" />
            <div className="blog-author-name">Author: {blog.author}</div>
            <div className="blog-category-name">
              Category: {blog.categories.map(({ name }) => name).join(", ")}
            </div>
            <div className="row">
              <div className="col-1">
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-body">{blog.body}</p>
                <div className="share-btn-container">
                  <a
                    href={`https://www.facebook.com/sharer.php?u=${blogUrl}`}
                    className="facebook-btn"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a
                    href={`https://twitter.com/share?url=${blogUrl}&text=${blog.title}`}
                    className="twitter-btn"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="!#" className="pinterest-btn">
                    <i className="fab fa-pinterest"></i>
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?url=${blogUrl}&title=${blog.title}`}
                    className="linkedin-btn"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a
                    href={`https://wa.me/?text=${blog.title} ${blogUrl}`}
                    className="whatsapp-btn"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
                <AddCommentForm blogId={blog._id} />
                <CommentList comments={blog.comments} />
              </div>
              <div className="col-2">
                <h3>Side section</h3>
              </div>
            </div>
          </Fragment>
        ) : (
          <h2>Loading...</h2>
        )
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default BlogDetailPage;

// Social Share Links:
// WhatsApp:
// https://wa.me/?text=[post-title] [post-url]
// Facebook:
// https://www.facebook.com/sharer.php?u=[post-url]
// Twitter:
// https://twitter.com/share?url=[post-url]&text=[post-title]
// Pinterest:
// https://pinterest.com/pin/create/bookmarklet/?media=[post-img]&url=[post-url]&is_video=[is_video]&description=[post-title]
// LinkedIn:
// https://www.linkedin.com/shareArticle?url=[post-url]&title=[post-title]
