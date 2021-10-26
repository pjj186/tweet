import { authService, dbService } from "fbase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "@firebase/firestore";
import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { updateProfile } from "@firebase/auth";

const Profile = ({ refreshUser, history, setUserObject, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(await authService.currentUser, {
        displayName: newDisplayName,
      });
    }
    refreshUser();
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={newDisplayName}
          type="text"
          placeholder="Display name"
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default withRouter(Profile);
