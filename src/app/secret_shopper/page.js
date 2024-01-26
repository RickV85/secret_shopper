"use client";

import { useEffect, useState } from "react";
import { sendEmailPost, uploadImageImgurPost } from "../utils/apicalls";

export default function SecretShopper() {
  const [responses, setResponses] = useState({
    q1: "",
  });
  const [imgUpload, setImgUpload] = useState(null);
  const [imgUploadBase64, setImgUploadBase64] = useState("");
  const [imgUploadImgurUrl, setImgUploadImgurUrl] = useState("");

  useEffect(() => {
    if (imgUploadBase64 && !imgUploadImgurUrl) {
      const uploadImageToImgur = async () => {
        try {
          const imgFormData = new FormData();
          imgFormData.append("image", imgUploadBase64);
          imgFormData.append("type", "base64");

          const imgurRes = await uploadImageImgurPost(imgFormData);
          if (imgurRes.status === 200) {
            const imgurData = await JSON.parse(imgurRes.resBody);
            console.log(imgurData)
            setImgUploadImgurUrl(imgurData.data.link);
          } else {
            throw new Error(imgurRes);
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
      // Throw an error, only allow one photo upload
      return;
    }

    const photo = event.target.files[0];
    // if () {
    //   // image too large throw error
    // }
    if (photo) {
      setImgUpload(photo);
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
    // API call to post to api/send_email
    e.preventDefault();
    try {
      const sendRes = await sendEmailPost({
        responses: responses,
        photo: imgUploadImgurUrl,
      });
      console.log(sendRes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* Create reuseable components that render Yes/No, multiple choice questions, and text inputs
        then map over an array of questions/available responses with type to indicate which component to use */}
        {/* legend and fieldset for all questions */}
        <legend>Is this working?</legend>
        <fieldset>
          <input
            id="q1-yes"
            name="q1"
            value={"Yes"}
            type="radio"
            checked={responses["q1"] === "Yes"}
            onChange={handleInputChange}
          />
          <label htmlFor="yes">Yes</label>
          <input
            id="q1-no"
            name="q1"
            value={"No"}
            type="radio"
            checked={responses["q1"] === "No"}
            onChange={handleInputChange}
          />
          <label htmlFor="no">No</label>
        </fieldset>
        <label htmlFor="photoUpload">Upload a photo</label>
        <input
          name="photoUpload"
          type="file"
          onChange={(event) => handlePhotoUpload(event)}
        />
        <button role="submit">Submit</button>
      </form>
    </main>
  );
}
