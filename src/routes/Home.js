import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Tweet from "components/Tweet";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";

const Home = ({ userObj }) => {
  // 변수
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();

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

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      // attachment가 존재하면
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`); // 파일에 대한 reference 생성
      await uploadString(attachmentRef, attachment, "data_url"); // ref, 데이터, 데이터의 형식
      attachmentUrl = await getDownloadURL(attachmentRef);
    }
    const newTweet = {
      text: tweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(dbService, "tweets"), newTweet);
    setTweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    // FileRead API
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // 파일을 모두 읽으면 finishedEvent를 받는다.
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile); // 파일을 읽기 시작
  };

  const onClearAttachment = () => {
    setAttachment("");
    fileInput.current.value = null;
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
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <input type="submit" value="Tweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="Preview" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
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
