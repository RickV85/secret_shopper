"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { verifyCode } from "./utils/apicalls";

export default function Welcome() {
  const [userCode, setUserCode] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setUserCode(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const isAuthorized = await verifyCode(userCode);

      if (isAuthorized) {
        router.push("/form");
        // Save code to session storage or context
      } else {
        alert("FAILED AUTH");
      }
    } catch (error) {
      console.error(error);
      // handle error for user
    }
  };

  return (
    <main className={styles.main}>
      <input
        id="codeInput"
        type="text"
        value={userCode}
        onChange={(e) => handleChange(e)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </main>
  );
}
