import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AddBlogPage from "./pages/AddBlogPage/AddBlogPage";
import BlogsPage from "./pages/BlogsPage/BlogsPage";
import BlogDetailPage from "./pages/BlogDetailPage/BlogDetailPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import PageNotFoundPage from "./pages/PageNotFoundPage/PageNotFoundPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import UpdateBlogPage from "./pages/UpdateBlogPage/UpdateBlogPage";
import store from "./store/store";
import { getBlogsAction } from "./store/actions/blogsActions";
import { getCategoriesAction } from "./store/actions/categoriesActions";

import "./App.css";

const App = () => {
  useEffect(() => {
    store.dispatch(getBlogsAction());
    store.dispatch(getCategoriesAction());
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/blogs" component={BlogsPage} />
          <Route exact path="/contact-us" component={ContactPage} />
          <ProtectedRoute exact path="/blogs/add" component={AddBlogPage} />
          <ProtectedRoute
            exact
            path="/blogs/:id/update"
            component={UpdateBlogPage}
          />
          <Route exact path="/blogs/:id" component={BlogDetailPage} />
          <Route exact path="/admin" component={SignInPage} />
          <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
          <Route exact component={PageNotFoundPage} />
        </Switch>
        <Footer />
      </Fragment>
    </Provider>
  );
};

export default App;
