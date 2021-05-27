import "./ShareButtons.css";

const ShareButtons = ({ blog, blogUrl }) => {
  return (
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
  );
};

export default ShareButtons;

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
