import styles from "./DateInput.module.css"
import { generateTodaysDate } from "@/app/utils/utils";

export default function DateInput({ visitDate, setVisitDate }) {
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
        onChange={(e) => setVisitDate(e.target.value)}
      />
    </div>
  );
}
