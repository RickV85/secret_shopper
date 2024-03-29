"use client";
import styles from "./form.module.css";
import { useEffect, useState } from "react";
import { sendEmailPost } from "../utils/apicalls";
import { useRouter } from "next/navigation";
import { verifyCode } from "../utils/apicalls";
import Header from "../Components/Header/Header";
import { checkSurveySubmit, createSurveyDisplay } from "@/app/utils/utils";
import { surveyQuestions } from "./SurveyQuestions";
import DateInput from "../Components/DateInput/DateInput";
import EmailInput from "../Components/EmailInput/EmailInput";
import PhotoUpload from "../Components/PhotoUpload/PhotoUpload";
import Comment from "../Components/Comment/Comment";

export default function Form() {
  const [visitDate, setVisitDate] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [responses, setResponses] = useState(undefined);
  const [responseStateInitialized, setResponseStateInitialized] =
    useState(false);
  const [imgUploadImgurUrl, setImgUploadImgurUrl] = useState("");
  const [comment, setComment] = useState("");
  const [submitMsg, setSubmitMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Verifies that a user has the code, prevents direct nav
    const verifyUserCodeGetSesStorage = async () => {
      try {
        const userCode = window.sessionStorage.getItem("code");
        const isAuthorized = await verifyCode(userCode);

        if (!isAuthorized) {
          alert("Please return to the welcome page and enter your code.");
          router.push("/");
          return;
        }
        // Get savedResponses from session storage else
        // dynamically create initial response state of an object with
        // every question as a key and an empty string to prevent uncontrolled
        // to controlled input issue
        const savedResponses = window.sessionStorage.getItem("responses");
        if (savedResponses && savedResponses !== "undefined") {
          setResponses(JSON.parse(savedResponses));
        } else {
          const initialResponsesState = {};
          for (let i = 1; i < surveyQuestions.length; i++) {
            // Set initial response state qX: ""
            initialResponsesState[`q${i}`] = "";
            // If a MultiChoice question initialize an otherRes
            if (surveyQuestions[i].type === "multi") {
                initialResponsesState[`q${i}-explainRes`] = "";
            }
          }
          setResponses(initialResponsesState);
        }
        setResponseStateInitialized(true);
      } catch (error) {
        console.error(error);
        alert(
          "An error occurred, please return to the welcome page and re-enter your code."
        );
        router.push("/");
      }
    };
    verifyUserCodeGetSesStorage();
  }, []);

  useEffect(() => {
    // Sets responses as they are updated by user
    // only after initial blank responses created
    // to prevent initial overwrite
    if (responseStateInitialized) {
      window.sessionStorage.setItem("responses", JSON.stringify(responses));
    }
  }, [responses]);

  const handleInputChange = (e) => {
    setResponses({
      ...responses,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for responses on date, email and all survey questions
    // have a response. No other checking for specifics of responses.
    const formIncompleteError = checkSurveySubmit(
      visitDate,
      userEmail,
      responses
    );
    if (formIncompleteError) {
      return;
    } else {
      setSubmitMsg("Submitting your survey...");
    }

    try {
      const sendRes = await sendEmailPost({
        visitDate: visitDate,
        userEmail: userEmail,
        responses: responses,
        photoUrl: imgUploadImgurUrl,
        comment: comment,
      });

      if (sendRes.startsWith("Success")) {
        window.sessionStorage.clear();
        router.push("/complete");
      }
    } catch (error) {
      console.error(error);
      setSubmitMsg(
        `There was an error submitting your survey. 
        Please try reloading the page and resubmitting`
      );
    }
  };

  return (
    <>
      <Header showBackBtn={false} />
      <main className={styles.main}>
        <h1 className={styles["form-headline"]}>SECRET SHOPPER SURVEY</h1>
        {responseStateInitialized ? (
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            {/* REQUIRED - Date, email and all surveyQuestions */}
            <DateInput visitDate={visitDate} setVisitDate={setVisitDate} />
            <EmailInput userEmail={userEmail} setUserEmail={setUserEmail} />
            {createSurveyDisplay(surveyQuestions, responses, handleInputChange)}
            {/* OPTIONAL - Photo upload and additional comments*/}
            <PhotoUpload
              imgUploadImgurUrl={imgUploadImgurUrl}
              setImgUploadImgurUrl={setImgUploadImgurUrl}
            />
            <Comment comment={comment} setComment={setComment} />
            <div className={styles["submit-div"]}>
              {submitMsg ? (
                <p>{submitMsg}</p>
              ) : (
                <button role="submit" className={styles["submit-form-btn"]}>
                  SUBMIT
                </button>
              )}
            </div>
          </form>
        ) : (
          <h2 className={styles["loading-msg"]}>Loading...please wait</h2>
        )}
      </main>
    </>
  );
}
