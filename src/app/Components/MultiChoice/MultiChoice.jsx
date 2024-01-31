import styles from "./MultiChoice.module.css";

export default function MultiChoice({question, responses, onChangeHandler }) {
  return (
    <fieldset>
      <legend>{question}</legend>
      <input
        id="q1-yes"
        name="q1"
        value={"Yes"}
        type="radio"
        checked={responses["q1"] === "Yes"}
        onChange={onChangeHandler}
      />
      <label htmlFor="yes">Yes</label>
      <input
        id="q1-no"
        name="q1"
        value={"No"}
        type="radio"
        checked={responses["q1"] === "No"}
        onChange={onChangeHandler}
      />
      <label htmlFor="no">No</label>
    </fieldset>
  );
}
