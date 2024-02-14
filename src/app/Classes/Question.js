export class Question {
  // All strings, except for required=bool and explain is object,
  // resOptions= Array of strings
  // On MultiChoice, explain obj to showInput and requireRes
  // Will be undefined on TextInput
  constructor(num, qData) {
    this.name = `q${num}`;
    this.type = qData.type;
    this.required = qData.required || true;
    this.question = qData.question;
    this.responseOptions = qData.responseOptions;
    this.explain = qData.explain || null;
  }
}
