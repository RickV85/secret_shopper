export class Question {
  constructor(num, type, question,  responseOptions) {
    this.name = `q${num}`;
    this.type = type;
    this.question = question;
    this.responseOptions = responseOptions;
  }
}
