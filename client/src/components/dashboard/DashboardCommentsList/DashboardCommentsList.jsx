import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardComment from "../DashboardComment/DashboardComment";
import { getCommentsAction } from "../../../redux/actions/commentsActions";

import "./DashboardCommentsList.css";

const DashboardCommentsList = () => {
  const { comments, isLoading } = useSelector((state) => state.commentsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsAction());
  }, [dispatch]);

  return (
    <Fragment>
      {!isLoading ? (
        comments.length !== 0 ? (
          <ul className="dashboard-comments-list">
            {comments.map((comment) => {
              return <DashboardComment key={comment._id} comment={comment} />;
            })}
          </ul>
        ) : (
          <h2 className="message">No comment yet.</h2>
        )
      ) : (
        <h2 className="loading-text">Loading...</h2>
      )}
    </Fragment>
  );
};

export default DashboardCommentsList;
