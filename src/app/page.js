"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { verifyCode } from "./utils/apicalls";

export default function Welcome() {
  // Welcome page here
  // Enter code, verify on BE, send to app context
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const isAuthorized = await verifyCode(code);
      console.log(isAuthorized)

      if (isAuthorized) {
        alert("AUTHORIZED");
      } else {
        alert("FAILED AUTH");
      }
    } catch (error) {
      // handle error for user
    }
  };

  return (
    <main className={styles.main}>
      <input
        id="codeInput"
        type="text"
        value={code}
        onChange={(e) => handleChange(e)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </main>
  );
}
