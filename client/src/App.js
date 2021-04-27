import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Routes from "./components/Routes/Routes";
import { getBlogsAction } from "./store/actions/blogsActions";
import { getCategoriesAction } from "./store/actions/categoriesActions";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
