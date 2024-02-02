"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { sendEmailPost, uploadImageImgurPost } from "../utils/apicalls";
import { useRouter } from "next/navigation";
import { verifyCode } from "../utils/apicalls";
import Header from "../Components/Header/Header";
import { createSurveyDisplay } from "@/app/utils/utils";
import { surveyQuestions } from "./SurveyQuestions";
import DateInput from "../Components/DateInput/DateInput";
import EmailInput from "../Components/EmailInput/EmailInput";
import Comment from "../Components/Comment/Comment";
import PhotoUpload from "../Components/PhotoUpload/PhotoUpload";

export default function Form() {
  const [visitDate, setVisitDate] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [responses, setResponses] = useState(undefined);
  const [responseStateInitialized, setResponseStateInitialized] =
    useState(false);
  const [imgUpload, setImgUpload] = useState(undefined);
  const [imgUploadName, setImgUploadName] = useState("No file chosen");
  const [imgUploadBase64, setImgUploadBase64] = useState("");
  const [imgUploadImgurUrl, setImgUploadImgurUrl] = useState("");
  const [comment, setComment] = useState("");
  const router = useRouter();

  useEffect(() => {
    const verifyUserCode = async () => {
      try {
        const userCode = await window.sessionStorage.getItem("code");
        const isAuthorized = await verifyCode(userCode);

        if (!isAuthorized) {
          alert("Please return to the welcome page and re-enter your code.");
          router.push("/");
        } else {
          console.log("userCode verified");
        }
      } catch (error) {
        console.error(error);
        alert(
          "An error occurred, please return to the welcome page and re-enter your code."
        );
        router.push("/");
      }
    };
    verifyUserCode();
  }, []);

  useEffect(() => {
    // Dynamically create initial response state of an object with
    // every question as a key and an empty string to prevent uncontrolled
    // to controlled input issue
    const initialResponsesState = {};
    for (let i = 1; i <= surveyQuestions.length; i++) {
      initialResponsesState[`q${i}`] = "";
    }
    setResponses(initialResponsesState);
    setResponseStateInitialized(true);
  }, []);

  useEffect(() => {
    // Triggers upload api call to Imgur on new photo upload
    // Generates url of photo on Imgur
    if (imgUploadBase64 && !imgUploadImgurUrl) {
      const uploadImageToImgur = async () => {
        try {
          const imgFormData = new FormData();
          imgFormData.append("image", imgUploadBase64);
          imgFormData.append("type", "base64");

          const imgurRes = await uploadImageImgurPost(imgFormData);
          if (imgurRes) {
            setImgUploadImgurUrl(imgurRes.link);
          }
        } catch (error) {
          console.log(error);
          // error handling for user
        }
      };

      uploadImageToImgur();
    }
  }, [imgUploadBase64, imgUploadImgurUrl]);

  const handleInputChange = (e) => {
    setResponses({
      ...responses,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imgUpload && !imgUploadImgurUrl) {
      // error - wait for image to upload?
      return;
    }
    // All other input checking for required fields
    try {
      const sendRes = await sendEmailPost({
        visitDate: visitDate,
        userEmail: userEmail,
        responses: responses,
        photoUrl: imgUploadImgurUrl,
        comment: comment,
      });
      console.log(sendRes);
      // router.push("/complete");
    } catch (error) {
      console.error(error);
      // User error messaging
    }
  };

  // const createSurveyDisplay = (questions) => {
  //   const surveyQuestions = createSurveyQuestions(questions);
  //   const questionDisplay = surveyQuestions.map((q) => {
  //     switch (q.type) {
  //       case "multi":
  //         return (
  //           <MultiChoice
  //             key={q.name}
  //             data={q}
  //             responseState={responses}
  //             onChangeHandler={handleInputChange}
  //           />
  //         );
  //       case "text":
  //         return (
  //           <TextInput
  //             key={q.name}
  //             data={q}
  //             responseState={responses}
  //             onChangeHandler={handleInputChange}
  //           />
  //         );
  //     }
  //   });

  //   return questionDisplay;
  // };

  return (
    <>
      <Header showBackBtn={false} />
      <main className={styles.main}>
        <h1 className={styles["form-headline"]}>SECRET SHOPPER SURVEY</h1>
        {responseStateInitialized ? (
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <DateInput visitDate={visitDate} setVisitDate={setVisitDate} />
            <EmailInput userEmail={userEmail} setUserEmail={setUserEmail} />
            {/* All surveyQuestions */}
            {createSurveyDisplay(surveyQuestions, responses, handleInputChange)}
            {/* Photo upload */}
            <PhotoUpload
              imgUpload={imgUpload}
              setImgUpload={setImgUpload}
              imgUploadName={imgUploadName}
              setImgUploadName={setImgUploadName}
              setImgUploadBase64={setImgUploadBase64}
              imgUploadImgurUrl={imgUploadImgurUrl}
              setImgUploadImgurUrl={setImgUploadImgurUrl}
            />
            {/* Additional comments */}
            <Comment comment={comment} setComment={setComment} />
            <button role="submit" className={styles["submit-form-btn"]}>
              SUBMIT
            </button>
          </form>
        ) : (
          <h2 className={styles["initial-load-msg"]}>Loading...please wait</h2>
        )}
      </main>
    </>
  );
}
