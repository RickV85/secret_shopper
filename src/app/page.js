"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Welcome() {
  // Welcome page here
  // Enter code, verify on BE, send to app context
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <main className={styles.main}>
      <input
        id="codeInput"
        type="text"
        value={code}
        onChange={(e) => handleChange(e)}
      />
      <button>Submit</button>
    </main>
  );
}
