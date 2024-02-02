import { Question } from "../Classes/Question";

export const generateTodaysDate = () => {
  const today = new Date().toISOString().split("T")[0];
  return today;
}

export const createSurveyQuestions = (questions) => {
  const questionObjects = questions.map((qData, i) => {
    return new Question(i + 1, ...qData);
  });

  return questionObjects;
};
