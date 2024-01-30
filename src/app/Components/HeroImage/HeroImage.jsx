import Image from "next/image";
import styles from "./HeroImage.module.css";

export default function HeroImage() {
  return (
    <section className={styles["hero-section"]}>
      <div className={styles["hero-container"]}>
        <Image
          src={"/heroImage.jpg"}
          fill
          priority
          sizes={"100vw"}
          alt="Breakfast and dinner plates"
          className={styles["hero-img"]}
        />
      </div>
    </section>
  );
}
