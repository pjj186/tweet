import React from "react";

const Tweet = ({ nweetObj, isOwner }) => (
  <div>
    <h4>{nweetObj.text}</h4>
    {isOwner && (
      <>
        <button>Delete Tweet</button>
        <button>Edit Tweet</button>{" "}
      </>
    )}
  </div>
);

export default Tweet;
