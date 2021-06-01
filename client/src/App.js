import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Routes from "./components/Routes/Routes";
import { setTokenAction } from "./redux/actions/authActions";
import { getBlogsAction } from "./redux/actions/blogsActions";
import { getCategoriesAction } from "./redux/actions/categoriesActions";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && dispatch(setTokenAction(token));
    dispatch(getBlogsAction());
    dispatch(getCategoriesAction());
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <Routes />
      <Footer />
    </Fragment>
  );
};

export default App;
