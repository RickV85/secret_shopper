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
    question: "Was outside appearance clean-clean windows, porch, doors, etc.?",
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
  // [
  //   "multi",
  //   true,
  //   "Was the hostess area clean and organized?",
  //   [
  //     "5 - Very clean and well organized",
  //     "4",
  //     "3",
  //     "2",
  //     "1 - Not at all clean or organized",
  //   ],
  // ],
  // [
  //   "multi",
  //   true,
  //   "Were the bathrooms well stocked and cleaned?",
  //   ["Yes", "No"],
  //   true
  // ],
  // [
  //   "multi",
  //   true,
  //   "Were you promptly greeted by the host/hostess?",
  //   ["Yes", "No"],
  //   false
  // ],
  // [
  //   "multi",
  //   false,
  //   "If the host/hostess was occupied, did they say that they would be right with you?",
  //   ["Yes", "No"],
  //   false
  // ],
  // [
  //   "multi",
  //   true,
  //   "Was the server knowledgeable about the menu?",
  //   ["Yes", "No"],
  // ],
  // [
  //   "multi",
  //   true,
  //   "Did the server suggest a beverage or appetizer?",
  //   ["Yes", "No"],
  // ],
  // [
  //   "multi",
  //   true,
  //   "Was the server's appearance appropriate to the nature of the restaurant?",
  //   ["Yes", "No"],
  // ],
  // ["multi", true, "Did the food arrive in a timely fashion?", ["Yes", "No"]],
  // [
  //   "multi",
  //   true,
  //   "Did the server check back with you during the course of your meal?",
  //   ["Yes", "No"],
  // ],
  // [
  //   "multi",
  //   true,
  //   "Were the plates cleared at the end of your meal?",
  //   [
  //     "Agree",
  //     "Somewhat Agree",
  //     "Neutral",
  //     "Somewhat Disagree",
  //     "Strongly Disagree",
  //   ],
  // ],
  // [
  //   "multi",
  //   true,
  //   "What was your overall experience with the customer service?",
  //   ["5 - Excellent ", "4", "3", "2", "1 - Poor"],
  // ],
  // [
  //   "multi",
  //   true,
  //   "How would you rate the overall presentation and taste of the food?",
  //   ["5 - Excellent ", "4", "3", "2", "1 - Poor"],
  // ],
  // [
  //   "multi",
  //   true,
  //   "How would you rate the quality of the food you received?",
  //   ["5 - Excellent ", "4", "3", "2", "1 - Poor"],
  // ],
  // [
  //   "multi",
  //   true,
  //   "Did a manager or other team member check on your table during your stay?",
  //   ["Yes", "No"],
  // ],
];
