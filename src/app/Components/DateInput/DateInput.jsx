import { useEffect } from "react";
import styles from "./DateInput.module.css";
import { generateTodaysDate } from "@/app/utils/utils";

export default function DateInput({ visitDate, setVisitDate }) {
  useEffect(() => {
    const savedVisitDate = window.sessionStorage.getItem("visitDate");
    if (savedVisitDate) {
      setVisitDate(savedVisitDate);
    }
  }, []);

  return (
    <div className={styles.div}>
      <label htmlFor="visitDate">Date of visit</label>
      <input
        id="visitDate"
        name="visitDate"
        type="date"
        max={generateTodaysDate()}
        className={styles.input}
        value={visitDate}
        onChange={(e) => {
          setVisitDate(e.target.value);
          window.sessionStorage.setItem("visitDate", e.target.value);
        }}
      />
    </div>
  );
}
