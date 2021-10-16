import { authService } from "fbase";
import { withRouter } from "react-router-dom";
import React from "react";

const Profile = ({ history }) => {
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default withRouter(Profile);
