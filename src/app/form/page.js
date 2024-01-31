"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { sendEmailPost, uploadImageImgurPost } from "../utils/apicalls";
import { useRouter } from "next/navigation";
import { verifyCode } from "../utils/apicalls";
import Header from "../Components/Header/Header";
import { surveyQuestions } from "./SurveyQuestions";
import MultiChoice from "../Components/MultiChoice/MultiChoice";
import DateInput from "../Components/DateInput/DateInput";
import EmailInput from "../Components/EmailInput/EmailInput";

export default function Form() {
  const [visitDate, setVisitDate] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [responses, setResponses] = useState({});
  const [imgUpload, setImgUpload] = useState(null);
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

  const handlePhotoUpload = (event) => {
    if (imgUpload) {
      // Error message, already uploaded?
      return;
    } else if (event.target.files.length > 1) {
      // Error, only allow one photo upload
      return;
    }

    const photo = event.target.files[0];

    if (photo) {
      setImgUpload(photo);
      setImgUploadName(photo.name);
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();

        img.onload = () => {
          // Set the maximum height
          const maxHeight = 600; // Maximum height

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

          // Convert the canvas to a JPEG format with quality 80%
          const dataURI = canvas.toDataURL("image/jpeg", 0.8);
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
        responses: responses,
        photoUrl: imgUploadImgurUrl,
      });
      console.log(sendRes);
      // router.push("/complete");
    } catch (error) {
      console.error(error);
      // User error messaging
    }
  };

  const createSurveyDisplay = () => {
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
      }
    });
    return questionDisplay;
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1 className={styles["form-headline"]}>SECRET SHOPPER SURVEY</h1>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <DateInput
            setVisitDate={setVisitDate}
            divClass={styles["date-input-div"]}
            inputClass={styles["date-input"]}
          />
          <EmailInput
            setUserEmail={setUserEmail}
            divClass={styles["email-input-div"]}
            inputClass={styles["email-input"]}
          />
          {/* All surveyQuestions */}
          {createSurveyDisplay()}
          {/* Photo upload */}
          <div id="photoInputDiv" className={styles["photo-upload-div"]}>
            <label htmlFor="photoInputDiv">
              Optional - Upload a photo from your visit
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <label
                htmlFor="photoInput"
                className={styles["image-upload-input"]}
              >
                UPLOAD PHOTO
              </label>
              <input
                id="photoInput"
                name="photoUpload"
                type="file"
                onChange={(event) => handlePhotoUpload(event)}
                accept="image/*"
                style={{ display: "none" }}
              />
              <p>{imgUploadName}</p>
            </div>
          </div>
          {/* Additional comments */}
          <div className={styles["comment-div"]}>
            <label htmlFor="commentInput">
              Optional - Please leave any additional comments below
            </label>
            <textarea
              id="commentInput"
              name="comment"
              type="text"
              role="input"
              className={styles["comment-input"]}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button role="submit" className={styles["submit-form-btn"]}>
            SUBMIT
          </button>
        </form>
      </main>
    </>
  );
}
