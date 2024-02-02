import { useEffect, useState } from "react";
import styles from "./PhotoUpload.module.css";
import NextImage from "next/image";

export default function PhotoUpload({
  imgUpload,
  setImgUpload,
  imgUploadName,
  setImgUploadName,
  setImgUploadBase64,
  imgUploadImgurUrl,
  setImgUploadImgurUrl,
}) {
  const [loadingMsg, setLoadingMsg] = useState("");

  useEffect(() => {
    if (imgUpload && imgUploadImgurUrl === "") {
      setLoadingMsg("Uploading photo, please wait...");
    } else if (imgUploadImgurUrl === undefined) {
      setLoadingMsg(
        "Error uploading your photo. Please try again. If the issues persists, please try a smaller or different file."
      );
    } else {
      setLoadingMsg("");
    }
  }, [imgUploadImgurUrl, imgUpload]);

  useEffect(() => {
    if (imgUploadName && imgUploadName.length > 20) {
      const shortenedName = imgUploadName.slice(0, 20)
      setImgUploadName(`${shortenedName}...jpeg`)
    }
  }, [imgUploadName])

  const handleImageUpload = (event) => {
    const photo = event.target.files[0];

    // If an image has been uploaded, reset all state
    // triggers re-upload to allow for user to change
    // image if already uploaded
    if (imgUpload && photo) {
      setImgUpload(undefined);
      setImgUploadBase64("");
      setImgUploadImgurUrl("");
    }

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
  return (
    <section id="photoInputDiv" className={styles["photo-upload"]}>
      <label htmlFor="photoInputDiv">
        Optional - Upload a photo from your visit
      </label>
      <div className={styles["photo-upload-div"]}>
        <label htmlFor="photoInput" className={styles["photo-upload-input"]}>
          UPLOAD PHOTO
        </label>
        <input
          id="photoInput"
          name="photoUpload"
          type="file"
          onChange={(event) => handleImageUpload(event)}
          accept="image/*"
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
