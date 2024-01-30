"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { verifyCode } from "./utils/apicalls";
import Header from "./Components/Header/Header";

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
    <Header />
      {/* <input
        id="codeInput"
        type="text"
        value={userCode}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />
      <button onClick={handleSubmit}>Submit</button> */}
    </main>
  );
}
