import { Question } from "../Classes/Question";
import { surveyQuestions } from "../form/SurveyQuestions";
import MultiChoice from "../Components/MultiChoice/MultiChoice";
import TextInput from "../Components/TextInput/TextInput";

export const generateTodaysDate = () => {
  const today = new Date().toISOString().split("T")[0];
  return today;
};

export const createSurveyQuestions = (questions) => {
  const questionObjects = questions.map((qData, i) => {
    return new Question(i + 1, ...qData);
  });

  return questionObjects;
};

export const createSurveyDisplay = (questions, responseState, inputChangeHandler) => {
  const surveyQuestions = createSurveyQuestions(questions);
  const questionDisplay = surveyQuestions.map((q) => {
    switch (q.type) {
      case "multi":
        return (
          <MultiChoice
            key={q.name}
            data={q}
            responseState={responseState}
            onChangeHandler={inputChangeHandler}
          />
        );
      case "text":
        return (
          <TextInput
            key={q.name}
            data={q}
            responseState={responseState}
            onChangeHandler={inputChangeHandler}
          />
        );
    }
  });

  return questionDisplay;
};

export const createEmailResponseDisplay = (responses) => {
  let responseDisplay = "";
  surveyQuestions.forEach((q, i) => {
    let element;
    const qKey = `q${i + 1}`;
    const userResponse = responses[qKey];
    if (userResponse) {
      element = `
        <div>
          <h4>${q[1]}</h4>
          <p>${userResponse}</p>
        </div>
      `;
      responseDisplay += element;
    }
  });
  return responseDisplay;
};
