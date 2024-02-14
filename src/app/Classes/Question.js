export class Question {
  // All strings, except for required=bool and explain are bool,
  // resOptions= Array of strings
  constructor(num, qData) {
    this.name = `q${num}`;
    this.type = qData.type;
    this.required = qData.required;
    this.question = qData.question;
    this.responseOptions = qData.responseOptions;
    // On MultiChoice, explain obj to showInput and requireRes
    // Will be undefined on TextInput
    this.explain = qData.explain || null;
  }
}
