// qData: Question {
// name: q${questionNumber}
// type: "multi"
// resRequired: bool to indicate if a response is required
// question: string to display to a user of question
// responseOptions: array of input values - "Yes", "No"
// explain : { showInput: bool, requireRes: bool } -
// showInput indicates if a "Please explain" input should be shown
// and requireRes makes the explain response required
// }

// MultiChoice format :
// {
//   type: "multi",
//   resRequired: true,
//   question: "",
//   responseOptions: ["Yes", "No"],
//   explain: { showInput: true, resRequired: true }
// },

// TextInput format:
// { type: "text", resRequired: true, question: "What was your server's name?" },
export const surveyQuestions = [
  {
    type: "multi",
    resRequired: true,
    question:
      "Was the restaurant’s outside appearance attractive? Nice curb appeal?",
    responseOptions: [
      "Strongly Agree",
      "Agree",
      "Disagree",
      "Strongly Disagree",
      "Other",
    ],
    explain: { showInput: true, resRequired: true },
  },
  { type: "text", resRequired: true, question: "What was your server's name?" },
  {
    type: "multi",
    resRequired: true,
    question: "Was outside appearance clean - clean windows, porch, doors, etc.?",
    responseOptions: ["Yes", "No"],
    explain: { showInput: true, resRequired: true },
  },
  {
    type: "multi",
    resRequired: true,
    question: "Was the restaurant clean inside?",
    responseOptions: ["Yes", "No"],
    explain: {
      showInput: true,
      resRequired: true,
    },
  },
  {
    type: "multi",
    resRequired: true,
    question: "Was the hostess area clean and organized?",
    responseOptions: [
      "5 - Very clean and well organized",
      "4",
      "3",
      "2",
      "1 - Not at all clean or organized",
    ],
    explain: {
      showInput: true,
      resRequired: false,
    },
  },
  {
    type: "multi",
    resRequired: true,
    question: "Were the bathrooms well stocked and cleaned?",
    responseOptions: ["Yes", "No"],
    explain: {
      showInput: true,
      resRequired: true,
    },
  },
  {
    type: "multi",
    resRequired: true,
    question: "Were you promptly greeted by the host/hostess?",
    responseOptions: ["Yes", "No"],
    explain: {
      showInput: true,
      resRequired: true,
    },
  },
  {
    type: "multi",
    resRequired: false,
    question:
      "If the host/hostess was occupied, did they say that they would be right with you?",
    responseOptions: ["Yes", "No"],
    explain: {
      showInput: false,
      resRequired: false,
    },
  },
  {
    type: "multi",
    resRequired: true,
    question: "Was the server knowledgeable about the menu?",
    responseOptions: ["Yes", "No"],
    explain: {
      showInput: true,
      resRequired: false,
    },
  },
  {
    type: "multi",
    resRequired: true,
    question: "Did the server suggest a beverage or appetizer?",
    responseOptions: ["Yes", "No"],
    explain: {
      showInput: true,
      resRequired: false,
    },
  },
  {
    type: "multi",
    resRequired: true,
    question:
      "Was the server's appearance appropriate to the nature of the restaurant?",
    responseOptions: ["Yes", "No"],
    explain: {
      showInput: true,
      resRequired: true,
    },
  },
  {
    type: "multi",
    resRequired: true,
    question: "Did the food arrive in a timely fashion?",
    responseOptions: ["Yes", "No"],
    explain: {
      showInput: true,
      resRequired: false,
    },
  },
  {
    type: "multi",
    resRequired: true,
    question:
      "Did the server check back with you during the course of your meal?",
    responseOptions: ["Yes", "No"],
    explain: {
      showInput: true,
      resRequired: false,
    },
  },
  {
    type: "multi",
    resRequired: true,
    question: "Were the plates cleared at the end of your meal?",
    responseOptions: [
      "Agree",
      "Somewhat Agree",
      "Neutral",
      "Somewhat Disagree",
      "Strongly Disagree",
    ],
    explain: {
      showInput: true,
      resRequired: false,
    },
  },
  {
    type: "multi",
    resRequired: true,
    question: "What was your overall experience with the customer service?",
    responseOptions: ["5 - Excellent", "4", "3", "2", "1 - Poor"],
    explain: {
      showInput: true,
      resRequired: false,
    },
  },
  {
    type: "multi",
    resRequired: true,
    question:
      "How would you rate the overall presentation and taste of the food?",
    responseOptions: ["5 - Excellent", "4", "3", "2", "1 - Poor"],
    explain: {
      showInput: true,
      resRequired: false,
    },
  },
  {
    type: "multi",
    resRequired: true,
    question: "How would you rate the quality of the food you received?",
    responseOptions: ["5 - Excellent", "4", "3", "2", "1 - Poor"],
    explain: {
      showInput: true,
      resRequired: false,
    },
  },
  {
    type: "multi",
    resRequired: true,
    question:
      "Did a manager or other team member check on your table during your stay?",
    responseOptions: ["Yes", "No"],
    explain: {
      showInput: false,
      resRequired: false,
    },
  },
];
