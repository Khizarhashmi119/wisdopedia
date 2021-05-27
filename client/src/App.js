import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import Routes from "./components/routing/Routes/Routes";
import { getBlogsAction } from "./redux/actions/blogsActions";
import { getCategoriesAction } from "./redux/actions/categoriesActions";

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
