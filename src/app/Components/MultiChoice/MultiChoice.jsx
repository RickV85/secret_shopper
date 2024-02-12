import styles from "./MultiChoice.module.css";
import React from "react";

export default function MultiChoice({ data, responseState, onChangeHandler }) {
  // data: {
  // type: "multi"
  // question: string to display to a user
  // name: string name of question - "q1"
  // responseOptions: array of input values - "Yes", "No"
  // }

  // responseState: state object of all form questions and responses in Form
  // onChangeHandler: state setting func from Form

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{data.question}</legend>
      {data.responseOptions.map((option) => {
        const optionId = `${data.name}-${option}`;
        return (
          <div className={styles["input-div"]} key={optionId}>
            <input
              id={optionId}
              name={data.name}
              value={option}
              type="radio"
              checked={responseState[data.name] === option}
              onChange={onChangeHandler}
              className={styles["hidden-radio"]}
            />
            <label htmlFor={optionId} className={styles["custom-radio"]}></label>
            <label htmlFor={optionId} onClick={onChangeHandler}>{option}</label>
          </div>
        );
      })}
      {/* Conditionally render text input for "Other" and "No" response*/}
      {responseState[data.name] === "Other" || responseState[data.name] === "No" ? (
        <div className={styles["other-input-div"]}>
          <label htmlFor={`${data.name}-explainInput`}>
            Please explain below:
          </label>
          <input
            type="text"
            id={`${data.name}-explainInput`}
            name={`${data.name}-explainRes`}
            onChange={onChangeHandler}
          />
        </div>
      ) : null}
    </fieldset>
  );
}
