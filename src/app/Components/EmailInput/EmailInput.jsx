import styles from "./EmailInput.module.css"

export default function EmailInput({ userEmail, setUserEmail }) {
  return (
    <div className={styles.div}>
      <label>Email address</label>
      <input
        id="emailAddress"
        name="emailAddress"
        type="email"
        className={styles.input}
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
    </div>
  );
}
