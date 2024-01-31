export default function EmailInput({ setUserEmail, divClass, inputClass }) {
  return (
    <div className={divClass}>
      <label>Email address</label>
      <input
        id="emailAddress"
        name="emailAddress"
        type="email"
        className={inputClass}
        onChange={(e) => setUserEmail(e.target.value)}
      />
    </div>
  );
}
