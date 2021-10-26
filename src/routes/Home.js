import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {
  // 변수
  const [tweets, setTweets] = useState([]);

  // 함수
  useEffect(() => {
    const q = query(
      collection(dbService, "tweets"),
      orderBy("createdAt", "desc")
    );
    // 데이터베이스에서 뭔가를 하게 되면 알 수 있도록 해주는 것
    // snapshot을 이용하면 실시간으로 볼 수 있다.
    onSnapshot(q, (snapshot) => {
      const tweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArr);
    });
  }, []);

  return (
    <div className="container">
      <TweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid} // 로그인한 유저와 트윗을 만든 유저의 id를 비교
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
