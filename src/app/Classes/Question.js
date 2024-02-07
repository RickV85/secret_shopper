export class Question {
  // All strings, except for required=bool, and resOptions=Array of strings
  constructor(num, type, required, question, responseOptions) {
    this.name = `q${num}`;
    this.type = type;
    this.required = required;
    this.question = question;
    this.responseOptions = responseOptions;
  }
}
