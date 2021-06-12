import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { v4 } from "uuid";

import Alerts from "../Alerts/Alerts";
import * as alertActionTypes from "../../redux/actionTypes/alertActionTypes";

import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseURL =
      process.env.NODE_ENV === "production"
        ? "/api/v1"
        : "http://localhost:5000/api/v1";

    try {
      console.log(email);

      const { data } = await axios.post(`${baseURL}/news-letter/subscribe`, {
        email,
      });

      setEmail("");
      const alertId = v4();

      dispatch({
        type: alertActionTypes.ADD_ALERT,
        alert: {
          id: alertId,
          msg: data.msg,
          type: "success",
        },
      });

      setTimeout(
        () =>
          dispatch({
            type: alertActionTypes.DELETE_ALERT,
            id: alertId,
          }),
        5000
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-top-cols">
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
          <div className="footer-top-cols footer-top-col-2">
            <img
              className="footer-site-logo"
              src="/images/wisdopedia.png"
              alt="wisdopedia"
            />
            <h3 className="footer-site-branding">Wisdopedia</h3>
            <span>Follow us on.</span>
            <div className="social-links">
              <a href="https://www.facebook.com/officialwisdopedia">
                <div className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </div>
              </a>
              <a href="https://www.instagram.com/officialwisdopedia">
                <div className="social-link">
                  <i className="fab fa-instagram"></i>
                </div>
              </a>
              <a href="https://www.linkedin.com/company/wisdopedia">
                <div className="social-link">
                  <i className="fab fa-linkedin-in"></i>
                </div>
              </a>
            </div>
          </div>
          <div className="footer-top-cols footer-top-col-3">
            <h4>Subscribe our news letter.</h4>
            <form onSubmit={handleSubmit}>
              <input
                id="email"
                className="subscribe-email-input"
                type="text"
                name="email"
                value={email}
                placeholder="Your email address."
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="subscribe-button" type="submit">
                Subsrcibe
              </button>
            </form>
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
      <Alerts />
    </footer>
  );
};

export default Footer;
