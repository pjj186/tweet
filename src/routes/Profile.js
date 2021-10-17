import { authService } from "fbase";
import { withRouter } from "react-router-dom";
import React from "react";

const Profile = ({ history, setUserObject }) => {
  const onLogOutClick = () => {
    authService.signOut();
    setUserObject(null);
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default withRouter(Profile);
