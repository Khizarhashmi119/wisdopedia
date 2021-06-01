import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...otherProps }) => {
  const { isAuthenticated } = useSelector((state) => state.authState);
  return isAuthenticated ? (
    <Route component={Component} {...otherProps} />
  ) : (
    <Redirect to="/" />
  );
};

export default ProtectedRoute;
