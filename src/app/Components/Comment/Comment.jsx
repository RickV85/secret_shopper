import styles from "@/app/form/page";

export default function Comment({comment, setComment}) {
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
        onChange={(e) => setComment(e.target.value)}
      />
    </div>
  );
}
