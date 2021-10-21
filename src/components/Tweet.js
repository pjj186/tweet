import React, { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false); // editing 모드를 위한 상태
  const [newTweet, setNewTweet] = useState(tweetObj.text); // input에 입력된 text를 업데이트 해주기 위한 상태
  const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    // confirm은 true or false 반환
    if (ok) {
      // 삭제
      await deleteDoc(TweetTextRef);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev); // 이전값을 반전시켜줌
  const onSubmit = async (event) => {
    event.preventDefault();
    // 업데이트 부분
    await updateDoc(TweetTextRef, {
      text: newTweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your Tweet"
                  value={newTweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update Tweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && (
            <img
              src={tweetObj.attachmentUrl}
              width="50px"
              height="50px"
              alt="Avatar"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Tweet</button>
              <button onClick={toggleEditing}>Edit Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
