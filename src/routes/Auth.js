import { authService } from "fbase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import React from "react";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  // newAccount state의 상태를 토글해주는 함수
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
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
