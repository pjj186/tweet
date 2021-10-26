import React, { useEffect, useState } from "react";
import Router from "./Router";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObject] = useState(null);
  useEffect(() => {
    // 사용자의 로그인 상태의 변화를 관찰하는 관찰자를 추가시켜줌
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObject({
          displayName: user.displayName,
          uid: user.uid,
          // 여기서 updateProfile 함수는 우리가 원하는 updateProfile 함수를 제공해주는 역할
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObject({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? (
        <Router
          refreshUser={refreshUser}
          userObj={userObj}
          setUserObject={setUserObject}
        />
      ) : (
        "Initializeing..."
      )}
    </>
  );
}

export default App;
