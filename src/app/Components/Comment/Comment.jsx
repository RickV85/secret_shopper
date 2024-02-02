import { useEffect } from "react";
import styles from "./Comment.module.css";

export default function Comment({ comment, setComment }) {
  useEffect(() => {
    const savedComment = window.sessionStorage.getItem("comment");
    if (savedComment) {
      setComment(savedComment);
    }
  }, []);
  return (
    <div className={styles["comment-div"]}>
      <label htmlFor="commentInput">
        Optional - Please leave any additional comments below
      </label>
      <textarea
        id="commentInput"
        name="comment"
        type="text"
        role="input"
        className={styles["comment-input"]}
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
          window.sessionStorage.setItem("comment", e.target.value);
        }}
      />
    </div>
  );
}
