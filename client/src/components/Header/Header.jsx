import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

import { signOutAdminAction } from "../../redux/actions/authActions";
import * as alertActionTypes from "../../redux/actionTypes/alertActionTypes";

import "./Header.css";

const Header = () => {
  const [isNabarActive, setIsNavbarActive] = useState(false);
  const { pathname } = useLocation();
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

  const handleClick1 = () => {
    const alertId = v4();

    dispatch(signOutAdminAction());

    dispatch({
      type: alertActionTypes.ADD_ALERT,
      alert: {
        id: alertId,
        msg: "Successfully logged out.",
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
  };

  const handleClick2 = () => {
    setIsNavbarActive((prevState) => {
      return !prevState;
    });
  };

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
        <ul className={`nav-links ${isNabarActive && "navbar-active"}`}>
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
              <NavLink className="nav-link" to="#" onClick={handleClick1}>
                Logout
              </NavLink>
            </li>
          )}
        </ul>
        <button className="navbar-menu-btn" onClick={handleClick2}>
          Menu
        </button>
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

export default Header;
