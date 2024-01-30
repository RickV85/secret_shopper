import styles from "./page.module.css";
import Header from "./Components/Header/Header";
import HeroImage from "./Components/HeroImage/HeroImage";
import CodeInput from "./Components/CodeInput/CodeInput";

export default function Welcome() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <HeroImage />
        <CodeInput />
      </main>
    </>
  );
}
