import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signOutAdminAction } from "../../store/actions/authActions";

import "./Header.css";

const Header = ({ location: { pathname } }) => {
  let headerStyle;

  switch (pathname) {
    case "/":
      headerStyle = { backgroundImage: "url('/images/home.jpg')" };
      break;
    case "/blogs":
      headerStyle = { backgroundImage: "url('/images/blogs.jpg')" };
      break;
    case "/contact-us":
      headerStyle = { backgroundImage: "url('/images/contact-us.jpg')" };
      break;
    default:
      headerStyle = {};
  }

  const { isAuthenticated } = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  return (
    <header className="header" style={headerStyle}>
      <nav className="navbar">
        <div className="site-branding">
          <img
            className="site-logo"
            src="/images/wisdopedia.png"
            alt="wisdopedia"
          />
          <div className="site-title-section">
            <h1 className="site-title">
              <NavLink className="nav-link" to="/">
                Wisdopedia
              </NavLink>
            </h1>
            <span className="site-description">a source of wisdom</span>
          </div>
        </div>
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          {isAuthenticated && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <NavLink className="nav-link" to="/blogs">
              Blogs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact-us">
              Contact Us
            </NavLink>
          </li>
          {isAuthenticated && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="#"
                onClick={() => dispatch(signOutAdminAction())}
              >
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      {pathname === "/" && (
        <div className="header-title-section" style={{ textAlign: "center" }}>
          <p className="header-subtitle">A source of wisdom.</p>
          <h2 className="header-title">WISDOPEDIA</h2>
          <NavLink className="header-title-link" to="/blogs">
            Go to blogs
          </NavLink>
        </div>
      )}
      {pathname === "/blogs" && (
        <div className="header-title-section">
          <h2 className="header-title">BLOGS</h2>
        </div>
      )}
      {pathname === "/contact-us" && (
        <div className="header-title-section">
          <h2 className="header-title">CONTACT US</h2>
        </div>
      )}
    </header>
  );
};

export default withRouter(Header);
