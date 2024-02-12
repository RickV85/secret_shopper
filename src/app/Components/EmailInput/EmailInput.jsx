import { useEffect } from "react";
import styles from "./EmailInput.module.css";

export default function EmailInput({ userEmail, setUserEmail }) {
  useEffect(() => {
    const savedUserEmail = window.sessionStorage.getItem("userEmail");
    if (savedUserEmail) {
      setUserEmail(savedUserEmail);
    }
  }, []);
  return (
    <div className={styles.div}>
      <label htmlFor="emailAddress">Email address</label>
      <input
        id="emailAddress"
        className={styles.input}
        name="emailAddress"
        type="email"
        value={userEmail}
        onChange={(e) => {
          setUserEmail(e.target.value);
          window.sessionStorage.setItem("userEmail", e.target.value);
        }}
        required
      />
    </div>
  );
}
