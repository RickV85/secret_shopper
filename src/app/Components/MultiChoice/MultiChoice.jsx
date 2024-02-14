import { needsExplanation } from "@/app/utils/utils";
import styles from "./MultiChoice.module.css";
import React from "react";

export default function MultiChoice({ qData, responseState, onChangeHandler }) {
  // qData: Question {
  // name: q${questionNumber}
  // type: "multi"
  // resRequired: bool to indicate if a response is required
  // question: string to display to a user of question
  // responseOptions: array of input values - "Yes", "No"
  // explain : { showInput: bool, requireRes: bool } - 
  // showInput indicates if a "Please explain" input should be shown
  // and requireRes makes the explain response required
  // }

  // responseState: state object of all form questions and responses in Form
  // onChangeHandler: state setting func from Form

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{qData.question}</legend>
      {qData.responseOptions.map((option) => {
        const optionId = `${qData.name}-${option}`;
        return (
          <div className={styles["input-div"]} key={optionId}>
            <input
              id={optionId}
              className={styles["hidden-radio"]}
              name={qData.name}
              value={option}
              type="radio"
              checked={responseState[qData.name] === option}
              onChange={onChangeHandler}
              required={qData.resRequired}
            />
            <label
              htmlFor={optionId}
              className={styles["custom-radio"]}
            ></label>
            <label htmlFor={optionId} onClick={onChangeHandler}>
              {option}
            </label>
          </div>
        );
      })}
      {/* Conditionally render text input for "Other" and "No" response*/}
      {needsExplanation(responseState[qData.name]) && qData.explain?.showInput ? (
        <div className={styles["other-input-div"]}>
          <label htmlFor={`${qData.name}-explainInput`}>
            Please explain below:
          </label>
          <input
            type="text"
            id={`${qData.name}-explainInput`}
            name={`${qData.name}-explainRes`}
            onChange={onChangeHandler}
            required={qData.explain.resRequired}
          />
        </div>
      ) : null}
    </fieldset>
  );
}
