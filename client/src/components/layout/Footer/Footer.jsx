import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-top-col">
            <iframe
              src="https://www.youtube.com/embed/Cz3H7zeDt7A"
              title="footer-video"
              className="youtube-video"
            ></iframe>
          </div>
          <div className="footer-top-col footer-top-col-2">
            <img
              className="footer-site-logo"
              src="/images/wisdopedia.png"
              alt="wisdopedia"
            />
            <h3 className="footer-site-branding">Wisdopedia</h3>
            <div className="social-links">
              <a href="/">
                <div className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </div>
              </a>
              <a href="/">
                <div className="social-link">
                  <i className="fab fa-instagram"></i>
                </div>
              </a>
              <a href="/">
                <div className="social-link">
                  <i className="fab fa-linkedin-in"></i>
                </div>
              </a>
            </div>
          </div>
          <div className="footer-top-col footer-top-col-3">
            <h4>Importants links</h4>
            <ul className="footer-links">
              <li>
                <Link className="footer-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/blogs">
                  Blogs
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/contact-us">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-text">
            <p>Copyright &copy; {currentYear} Wisdopedia</p>
          </div>
          <div className="footer-text">
            <p>Powered by Wisdopedia</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
