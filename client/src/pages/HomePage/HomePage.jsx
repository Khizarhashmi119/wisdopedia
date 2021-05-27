import { useSelector } from "react-redux";

import BlogsPreviewList from "../../components/layout/BlogsPreviewList/BlogsPreviewList";
import Quote from "../../components/layout/Quote/Quote";

import "./HomePage.css";

const HomePage = () => {
  const { blogs, isLoading } = useSelector((state) => state.blogsState);

  return (
    <div className="home-page">
      <div className="home-page-blogs-preview-section">
        <h3 className="blogs-preview-section-title">Recents blogs</h3>
        {!isLoading ? (
          blogs.length !== 0 ? (
            <BlogsPreviewList
              blogs={blogs.filter((blog, index) => index <= 2)}
            />
          ) : (
            <h2 className="message">No blog yet.</h2>
          )
        ) : (
          <h2 className="loading-text">Loading...</h2>
        )}
      </div>
      <div className="quote-section">
        <h3 className="quote-section-title">Inspiring quote of the day</h3>
        <Quote />
      </div>
    </div>
  );
};

export default HomePage;
