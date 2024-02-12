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

  const todaysDate = generateTodaysDate();

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate > todaysDate) {
      alert("Please do not pick a day in the future.");
      return;
    }
    setVisitDate(selectedDate);
    window.sessionStorage.setItem("visitDate", selectedDate);
  };

  return (
    <div className={styles.div}>
      <label htmlFor="visitDate">Date of visit</label>
      <input
        id="visitDate"
        className={styles.input}
        name="visitDate"
        type="date"
        max={todaysDate}
        min={"2020-01-01"}
        value={visitDate}
        onChange={handleDateChange}
        required
      />
    </div>
  );
}
