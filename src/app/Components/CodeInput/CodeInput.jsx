"use client";
import styles from "./CodeInput.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyCode } from "@/app/utils/apicalls";
import Link from "next/link";

export default function CodeInput() {
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
    <section className={styles["code-input-section"]}>
      <h1 className={styles["welcome-headline"]}>WELCOME, SECRET SHOPPER!</h1>
      <div className={styles["input-div"]}>
        <label htmlFor="codeInput" className={styles["input-label"]}>
          Please enter your code below to begin the survey
        </label>
        <input
          id="codeInput"
          className={styles["code-input"]}
          type="text"
          value={userCode}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <button className={styles["submit-btn"]} onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <p className={styles.details}>
        If you do not have a code and would like to participate in our secret
        shopper program, please send an email to
        <br />
        <Link href={"mailto:julian@buttermilkkitchen.com"}>
          julian@buttermilkkitchen.com
        </Link>
        .
      </p>
    </section>
  );
}
