"use client";
import { useEffect, useState } from "react";
import styles from "./PhotoUpload.module.css";
import NextImage from "next/image";
import { uploadImageImgurPost } from "@/app/utils/apicalls";
import { scaleAndProcessImage, isHeicImg } from "@/app/utils/utils";

export default function PhotoUpload({
  imgUploadImgurUrl,
  setImgUploadImgurUrl,
}) {
  const [imgUpload, setImgUpload] = useState(undefined);
  const [imgUploadName, setImgUploadName] = useState("No file chosen");
  const [imgUploadBase64, setImgUploadBase64] = useState("");
  const [loadingMsg, setLoadingMsg] = useState("");
  const heic2any = require("heic2any");

  useEffect(() => {
    // If there is an image file and no Imgur URL, upload
    if (imgUpload && imgUploadImgurUrl === "") {
      setLoadingMsg("Uploading photo, please wait...");
      // Undefined return from Imgur is an error, likely over 10MB file
    } else if (imgUploadImgurUrl === undefined) {
      setLoadingMsg(
        "Error uploading your photo. Please try again. If the issues persists, please try a smaller or different file."
      );
    } else {
      // Clear loading message if there is a image file AND Imgur URL
      setLoadingMsg("");
    }
  }, [imgUploadImgurUrl, imgUpload]);

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
          setLoadingMsg("Error uploading image, please try again.");
        }
      };

      uploadImageToImgur();
    }
  }, [imgUploadBase64, imgUploadImgurUrl]);

  useEffect(() => {
    // Limit name to 20 characters to prevent layout issues
    if (imgUploadName && imgUploadName.length > 20) {
      const shortenedName = imgUploadName.slice(0, 20);
      setImgUploadName(`${shortenedName}...`);
    }
  }, [imgUploadName]);

  const handleImageUpload = async (event) => {
    const photo = event.target.files[0];

    // If an image has been uploaded, reset all state.
    if (imgUpload && photo) {
      setImgUpload(undefined);
      setImgUploadBase64("");
      setImgUploadImgurUrl("");
    }

    // If user cancels file upload, stop
    if (!photo) return;
    setImgUpload(photo);
    setImgUploadName(photo.name);

    // Create base64 code via converting HEIC then processing and scaling,
    // else process and scale img directly
    let scaledJpgBase64 = "";
    if (photo.type === "image/heic" || isHeicImg(photo.name)) {
      try {
        const convertedBlob = await heic2any({
          blob: photo,
          toType: "image/jpeg",
          quality: 0.25,
        });

        scaledJpgBase64 = await scaleAndProcessImage(convertedBlob);
      } catch (error) {
        console.error("Error converting HEIC to JPEG:", error);
        setLoadingMsg(
          "HEIC photo conversion failed. Please try uploading again."
        );
      }
    } else {
      scaledJpgBase64 = await scaleAndProcessImage(photo);
    }

    if (scaledJpgBase64) {
      setImgUploadBase64(scaledJpgBase64);
    } else {
      setLoadingMsg("Error processing image. Please try uploading again.");
    }
  };

  return (
    <section id="photoInputDiv" className={styles["photo-upload"]}>
      <p htmlFor="photoInputDiv" role="label">
        Optional - Upload a photo from your visit
      </p>
      <div id="photoInputDiv" className={styles["photo-upload-div"]}>
        <label htmlFor="photoInput" className={styles["photo-upload-input"]}>
          UPLOAD PHOTO
        </label>
        <input
          id="photoInput"
          name="photoUpload"
          type="file"
          onChange={(event) => handleImageUpload(event)}
          accept="image/jpeg, image/heic"
          style={{ display: "none" }}
        />
        <div className={styles["photo-name-div"]}>
          <p>{imgUploadName}</p>
        </div>
      </div>
      {loadingMsg ? (
        <p className={styles["uploading-msg"]}>{loadingMsg}</p>
      ) : null}
      {imgUploadImgurUrl ? (
        <div className={styles["uploaded-photo"]}>
          <NextImage
            src={imgUploadImgurUrl}
            priority
            fill
            style={{ objectFit: "contain" }}
            sizes="50vw"
            alt="Your uploaded photo"
          />
        </div>
      ) : null}
    </section>
  );
}
