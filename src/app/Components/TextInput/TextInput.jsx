import styles from "./TextInput.module.css"

export default function TextInput({ data, responseState, onChangeHandler }) {
  return (
    <div className={styles.div}>
      <label htmlFor={`${data.name}`}>{data.question}</label>
      <input
        id={`${data.name}`}
        className={styles.input}
        name={`${data.name}`}
        type="text"
        value={responseState[data.name]}
        onChange={onChangeHandler}
        required={data.required}
      />
    </div>
  );
}
