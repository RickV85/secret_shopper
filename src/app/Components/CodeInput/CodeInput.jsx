"use client";
import styles from "./CodeInput.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyCode } from "@/app/utils/apicalls";
import Link from "next/link";

export default function CodeInput() {
  const [userCode, setUserCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setUserCode(e.target.value);
  };

  const failedAuth = () => {
    setErrorMsg(
      "Please check the code and try again"
    );
    setTimeout(() => {
      setErrorMsg("");
      setUserCode("");
    }, 2000);
  };

  const handleSubmit = async () => {
    try {
      const isAuthorized = await verifyCode(userCode);

      if (isAuthorized) {
        router.push("/form");
        // Save code to session storage or context
      } else {
        failedAuth();
      }
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred, please refresh the page and try to input your code again."
      );
    }
  };

  return (
    <section className={styles["code-input-section"]}>
      <h1 className={styles["welcome-headline"]}>WELCOME, SECRET SHOPPER!</h1>
      <div className={styles["input-div"]}>
        {!errorMsg ? <label htmlFor="codeInput" >
          Please enter your code below to begin the survey
        </label> : <p className={styles.error}>{errorMsg}</p>}
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
