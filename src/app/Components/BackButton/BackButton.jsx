"use client"
import styles from "./BackButton.module.css";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      id="backButton"
      className={styles.button}
      onClick={() => router.back()}
    >
      BACK
    </button>
  );
}
