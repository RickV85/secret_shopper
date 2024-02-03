import styles from "./page.module.css";
import Header from "./Components/Header/Header";
import HeroImage from "./Components/HeroImage/HeroImage";
import CodeInput from "./Components/CodeInput/CodeInput";

export default function Welcome() {
  return (
    <>
      <Header showBackBtn={true} />
      <main className={styles.main}>
        <HeroImage />
        {/* REMOVE SS CLEARING IN CODE INPUT */}
        <CodeInput />
      </main>
    </>
  );
}
