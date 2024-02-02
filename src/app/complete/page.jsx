import Link from "next/link";
import Header from "../Components/Header/Header";
import HeroImage from "../Components/HeroImage/HeroImage";
import styles from "./page.module.css";

export default function Complete() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <HeroImage />
        <section className={styles["thank-you-section"]}>
          <h1 className={styles.headline}>THANK YOU FOR YOUR FEEDBACK!</h1>
          <div className={styles["thank-you-div"]}>
            <p>
              Your feedback is important to us!
              <br />
              <br />
              If you do not receive an e-gift card within the next 5 business
              days, please send an email to
              <br />
              <Link href={"mailto: julian@buttermilkkitchen.com"}>
                julian@buttermilkkitchen.com
              </Link>
              .
            </p>
            <button className={styles.button}>RETURN TO HOME PAGE</button>
          </div>
        </section>
      </main>
    </>
  );
}
