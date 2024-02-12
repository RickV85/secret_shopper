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

export const createSurveyDisplay = (
  questions,
  responseState,
  inputChangeHandler
) => {
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

export const isHeicImg = (photoName) => {
  const photoFileNameLength = photoName.length;
  const fileType = photoName.slice(photoFileNameLength - 4).toLowerCase();
  if (fileType === "heic" || fileType === "heif") {
    return true;
  } else {
    return false;
  }
};

export const scaleAndProcessImage = (photo) => {
  return new Promise((resolve, reject) => {
    if (!photo) {
      reject("No photo to process");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;
        const scaleRatio = maxHeight / height;

        // Scale if the height exceeds maxHeight
        if (scaleRatio < 1) {
          width = width * scaleRatio;
          height = maxHeight;
        }

        // Resize the canvas to the new dimensions
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        // Determine the quality factor based on the original file size
        let quality = 0.8;
        if (photo.size >= 3000000 && photo.size < 5000000) {
          // If the file size is greater than 3MB, less than 5MB - 30%
          quality = 0.6;
        } else if (photo.size >= 5000000) {
          // If larger than 5MB reject
          reject("Please upload a smaller image.");
        }

        // Convert the canvas to a JPEG format
        const dataURI = canvas.toDataURL("image/jpeg", quality);
        // Remove prefix, start at "/"
        const base64 = dataURI.split(",")[1];

        resolve(base64);
      };

      img.onerror = () => {
        reject("Failed to load image");
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(photo);
  });
};

export const checkSurveySubmit = (date, email, responses) => {
  if (!date) {
    alert("Please enter a date for your visit.");
    return true;
  } else if (!email) {
    alert("Please enter your email address.");
    return true;
  }
  for (const res in responses) {
    const questionIndex = +res.split("q")[1] - 1;
    // If question is not an "explainRes" on a "Other" or "No"
    // MultiChoice question response. These do not have question
    // data associated and are not required.
    if (!res.endsWith("explainRes")) {
      const isRequired = surveyQuestions[questionIndex][1];
      if (!responses[res] && isRequired) {
        alert(
          `Please enter a response for question - "${surveyQuestions[questionIndex][2]}"`
        );
        return true;
      }
    }
  }
  return false;
};

export const createEmailResponseDisplay = (responses) => {
  let responseDisplay = "";
  surveyQuestions.forEach((q, i) => {
    let element;
    const qKey = `q${i + 1}`;
    const userResponse = responses[qKey];
    const explainRes = responses[`${qKey}-explainRes`];
    if (userResponse && explainRes) {
      element = `
        <div>
          <h4>${q[2]}</h4>
          <p>${userResponse} - ${explainRes}</p>
        </div>
      `;
      responseDisplay += element;
    } else if (userResponse) {
      element = `
        <div>
          <h4>${q[2]}</h4>
          <p>${userResponse}</p>
        </div>
      `;
      responseDisplay += element;
    }
  });
  return responseDisplay;
};
