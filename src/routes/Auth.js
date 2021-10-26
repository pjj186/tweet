import { authService } from "fbase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import React, { useState } from "react";
import AuthForm from "components/AuthForm";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true);

  // newAccount state의 상태를 토글해주는 함수
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider; // 소셜 로그인을 하기위해선 첫번째로 provider를 만들어줘야함
    if (name === "google") {
      provider = new GoogleAuthProvider(); // GoogleAuthProvider 생성
    } else if (name === "github") {
      provider = new GithubAuthProvider(); // GithubAuthProvier 생성
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div>
      <AuthForm newAccount={newAccount} />
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
