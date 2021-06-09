import { Switch, Route } from "react-router-dom";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AddBlogPage from "../../pages/AddBlogPage/AddBlogPage";
import BlogsPage from "../../pages/BlogsPage/BlogsPage";
import BlogDetailPage from "../../pages/BlogDetailPage/BlogDetailPage";
import ContactPage from "../../pages/ContactPage/ContactPage";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import HomePage from "../../pages/HomePage/HomePage";
import PageNotFoundPage from "../../pages/PageNotFoundPage/PageNotFoundPage";
import SignInPage from "../../pages/SignInPage/SignInPage";
import UpdateBlogPage from "../../pages/UpdateBlogPage/UpdateBlogPage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/blogs" component={BlogsPage} />
      <Route exact path="/contact-us" component={ContactPage} />
      <ProtectedRoute exact path="/blogs/add" component={AddBlogPage} />
      <ProtectedRoute
        exact
        path="/blogs/:slug/update"
        component={UpdateBlogPage}
      />
      <Route exact path="/blogs/:slug" component={BlogDetailPage} />
      <Route exact path="/admin" component={SignInPage} />
      <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
      <Route exact component={PageNotFoundPage} />
    </Switch>
  );
};

export default Routes;
