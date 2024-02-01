import styles from "./TextInput.module.css"

export default function TextInput({ data, responseState, onChangeHandler }) {
  return (
    <div className={styles.div}>
      <label htmlFor={`${data.name}`}>{data.question}</label>
      <input
        id={`${data.name}`}
        name={`${data.name}`}
        type="text"
        value={responseState[data.name]}
        onChange={onChangeHandler}
        className={styles.input}
      />
    </div>
  );
}
