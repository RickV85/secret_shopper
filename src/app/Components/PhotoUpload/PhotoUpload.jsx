import styles from "./PhotoUpload.module.css";
import Image from "next/image";

export default function PhotoUpload({
  handleImageUpload,
  imgUploadName,
  imgUpload,
  imgUploadImgurUrl,
}) {
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
        <p>{imgUploadName}</p>
      </div>
      {imgUpload && !imgUploadImgurUrl ? <p className={styles["uploading-msg"]}>Uploading image, please wait...</p> : null}
      {imgUploadImgurUrl ? (
        <div className={styles["uploaded-photo"]}>
          <Image
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
