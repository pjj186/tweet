import { authService, dbService } from "fbase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "@firebase/firestore";
import { withRouter } from "react-router-dom";
import React, { useEffect } from "react";

const Profile = ({ history, setUserObject, userObj }) => {
  const onLogOutClick = () => {
    authService.signOut();
    setUserObject(null);
    history.push("/");
  };
  const getMyTweets = async () => {
    const q = query(
      collection(dbService, "tweets"),
      // 데이터베이스에서 현재 로그인 중인 uid와 같은 creatorId를 찾는다.
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };
  useEffect(() => {
    getMyTweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default withRouter(Profile);
