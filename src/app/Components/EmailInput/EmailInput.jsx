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
      <label>Email address</label>
      <input
        id="emailAddress"
        name="emailAddress"
        type="email"
        className={styles.input}
        value={userEmail}
        onChange={(e) => {
          setUserEmail(e.target.value);
          window.sessionStorage.setItem("userEmail", e.target.value);
        }}
      />
    </div>
  );
}
