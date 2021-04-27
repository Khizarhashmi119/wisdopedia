import { useState } from "react";
import { useSelector } from "react-redux";

import BlogsPreviewList from "../../components/BlogsPreviewList/BlogsPreviewList";

import "./BlogsPage.css";

const BlogsPage = () => {
  const { blogs, isLoading } = useSelector((state) => state.blogsState);
  const [searchField, setSearchField] = useState("");

  let filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchField.toLowerCase())
  );

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <div className="blogs-page-blogs-preview-section">
      <p className="blogs-preview-section-title">Readers are leaders.</p>
      <input
        type="search"
        className="search-blog"
        placeholder="Search"
        value={searchField}
        onChange={handleChange}
      />
      {!isLoading ? (
        blogs.length !== 0 ? (
          <BlogsPreviewList blogs={filteredBlogs} />
        ) : (
          <h2 className="message">No blog yet.</h2>
        )
      ) : (
        <h2 className="loading-text">Loading...</h2>
      )}
    </div>
  );
};

export default BlogsPage;
