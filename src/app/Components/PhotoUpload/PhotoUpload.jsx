import { useEffect, useState } from "react";
import styles from "./PhotoUpload.module.css";
import NextImage from "next/image";
import { uploadImageImgurPost } from "@/app/utils/apicalls";

export default function PhotoUpload({
  imgUploadImgurUrl,
  setImgUploadImgurUrl,
}) {
  const [imgUpload, setImgUpload] = useState(undefined);
  const [imgUploadName, setImgUploadName] = useState("No file chosen");
  const [imgUploadBase64, setImgUploadBase64] = useState("");
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
    if (imgUploadName && imgUploadName.length > 20) {
      const shortenedName = imgUploadName.slice(0, 20);
      setImgUploadName(`${shortenedName}...jpeg`);
    }
  }, [imgUploadName]);

  const handleImageUpload = async (event) => {
    const photo = event.target.files[0];

    // If an image has been uploaded, reset all state
    // triggers re-upload to allow for user to change
    // image if already uploaded
    if (imgUpload && photo) {
      setImgUpload(undefined);
      setImgUploadBase64("");
      setImgUploadImgurUrl("");
    }
  
    if (!photo) return;
  
    // Check if the image is HEIC format
    if (photo.type === "image/heic" || photo.name.endsWith('.HEIC')) {
      try {
        // Convert HEIC to JPEG
        const convertedBlob = await heic2any({
          blob: photo,
          toType: "image/jpeg",
          quality: 0.8 // Adjust quality as needed
        });
  
        // Proceed with the converted JPEG blob
        processImage(convertedBlob);
      } catch (error) {
        console.error("Error converting HEIC to JPEG:", error);
        setLoadingMsg("HEIC photo conversion failed. Please try uploading again.")
      }
    } else {
      // If not HEIC, proceed with the original image file
      processImage(photo);
    }
  };


// REFACTOR THIS IN TO UTILS ONCE iOS issue fixed
  const processImage = (photo) => {


    if (photo) {
      setImgUpload(photo);
      setImgUploadName(photo.name);
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();

        img.onload = () => {
          const maxHeight = 600;
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
          let quality = 0.6;
          if (photo.size > 5000000) {
            // If the file size is greater than 5MB - 40%
            quality = 0.4;
          } else if (photo.size > 10000000) {
            // If the file size is greater than 10MB - 20%
            quality = 0.2;
          }

          // Convert the canvas to a JPEG format
          const dataURI = canvas.toDataURL("image/jpeg", quality);
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
          accept="image/jpeg"
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
