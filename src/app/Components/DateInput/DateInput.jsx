import { generateTodaysDate } from "@/app/utils/utils";

export default function DateInput({ className }) {
  return (
    <div className={className}>
      <label htmlFor="visitDate">Date of visit</label>
      <input
        id="visitDate"
        name="visitDate"
        type="date"
        max={generateTodaysDate()}
      />
    </div>
  );
}
