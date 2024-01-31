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

  {
    /* <input
        id="q1-yes"
        name="q1"
        value={"Yes"}
        type="radio"
        checked={responseState["q1"] === "Yes"}
        onChange={onChangeHandler}
      />
      <label htmlFor="q1-yes">Yes</label> */
  }

  return (
    <fieldset>
      <legend>{data.question}</legend>
      {data.responseOptions.map((option) => {
        const optionId = `${data.name}-${option}`;
        return (
          <React.Fragment key={optionId}>
            <input
              id={optionId}
              name={data.name}
              value={option}
              type="radio"
              checked={responseState[data.name] === option}
              onChange={onChangeHandler}
            />
            <label htmlFor={optionId}>{option}</label>
          </React.Fragment>
        );
      })}
    </fieldset>
  );
}
