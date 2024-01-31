import { Question } from "../Classes/Question";

export const createSurveyQuestions = () => {
  const questions = [
    ["multi", "Is this working?", ["Yes", "No"]],
    [
      "multi",
      "Was the restaurant’s outside appearance attractive? Nice curb appeal?",
      ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree", "Other"],
    ],
  ];

  const questionObjects = questions.map((qData, i) => {
    return new Question(i + 1, ...qData);
  })

  return questionObjects;
};
