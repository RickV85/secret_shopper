"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { sendEmailPost, uploadImageImgurPost } from "../utils/apicalls";
import { useRouter } from "next/navigation";
import { verifyCode } from "../utils/apicalls";
import Header from "../Components/Header/Header";
import { createSurveyQuestions } from "@/app/utils/utils";
import { surveyQuestions } from "./SurveyQuestions";
import MultiChoice from "../Components/MultiChoice/MultiChoice";
import DateInput from "../Components/DateInput/DateInput";
import EmailInput from "../Components/EmailInput/EmailInput";
import TextInput from "../Components/TextInput/TextInput";
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

  const handleImageUpload = (event) => {
    // If an image has been uploaded, reset all state
    // triggers re-upload to allow for user to change
    // image if already uploaded
    if (imgUpload) {
      setImgUpload(undefined);
      setImgUploadBase64("");
      setImgUploadImgurUrl("");
    }

    const photo = event.target.files[0];

    if (photo) {
      setImgUpload(photo);
      setImgUploadName(photo.name);
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();

        img.onload = () => {
          // Set the maximum height in px
          const maxHeight = 1000;

          // Calculate the scale factor to maintain aspect ratio
          let width = img.width;
          let height = img.height;

          const scaleRatio = maxHeight / height;

          if (scaleRatio < 1) {
            // Only scale if the height exceeds maxHeight
            width = width * scaleRatio;
            height = maxHeight;
          }

          // Resize the canvas to the new dimensions
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          // Convert the canvas to a JPEG format with quality 100%
          const dataURI = canvas.toDataURL("image/jpeg", 1);
          // Remove prefix
          const base64 = dataURI.split(",")[1];

          setImgUploadBase64(base64);
        };

        img.src = e.target.result;
      };

      reader.readAsDataURL(photo);
    }
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

  const createSurveyDisplay = (questions) => {
    const surveyQuestions = createSurveyQuestions(questions);
    const questionDisplay = surveyQuestions.map((q) => {
      switch (q.type) {
        case "multi":
          return (
            <MultiChoice
              key={q.name}
              data={q}
              responseState={responses}
              onChangeHandler={handleInputChange}
            />
          );
        case "text":
          return (
            <TextInput
              key={q.name}
              data={q}
              responseState={responses}
              onChangeHandler={handleInputChange}
            />
          );
      }
    });

    return questionDisplay;
  };

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
            {createSurveyDisplay(surveyQuestions)}
            {/* Photo upload */}
            <PhotoUpload
              handleImageUpload={handleImageUpload}
              imgUploadName={imgUploadName}
              imgUpload={imgUpload}
              imgUploadImgurUrl={imgUploadImgurUrl}
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
