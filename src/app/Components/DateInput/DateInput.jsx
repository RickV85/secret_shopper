import { generateTodaysDate } from "@/app/utils/utils";

export default function DateInput({ setVisitDate, divClass, inputClass }) {
  return (
    <div className={divClass}>
      <label htmlFor="visitDate">Date of visit</label>
      <input
        id="visitDate"
        name="visitDate"
        type="date"
        max={generateTodaysDate()}
        className={inputClass}
        onChange={(e) => setVisitDate(e.target.value)}
      />
    </div>
  );
}
