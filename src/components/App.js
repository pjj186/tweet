import React, { useEffect, useState } from "react";
import Router from "./Router";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // 사용자의 로그인 상태의 변화를 관찰하는 관찰자를 추가시켜줌
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return <>{init ? <Router isLoggedIn={isLoggedIn} /> : "Initializeing..."}</>;
}

export default App;
