import React, { Fragment } from "react";

import DashboardComment from "../DashboardComment/DashboardComment";

import "./DashboardCommentsList.css";

const DashboardCommentsList = () => {
  return (
    <Fragment>
      Comment list
      <DashboardComment />
      <DashboardComment />
      <DashboardComment />
      <DashboardComment />
      <DashboardComment />
    </Fragment>
  );
};

export default DashboardCommentsList;
