import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
} from "firebase/firestore";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const getTweets = async () => {
    const q = query(collection(dbService, "tweets"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const tweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setTweets((prev) => [tweetObj, ...prev]);
    });
  };
  useEffect(() => {
    getTweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "tweets"), {
      tweet,
      createdAt: serverTimestamp(),
    });
    setTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          name="tweet"
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h4>{tweet.tweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
