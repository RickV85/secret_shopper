import styles from "./page.module.css";
import Header from "./Components/Header/Header";
import HeroImage from "./Components/HeroImage/HeroImage";
import CodeInput from "./Components/CodeInput/CodeInput";

export default function Welcome() {
  return (
    <main className={styles.main}>
      <Header />
      <HeroImage />
      <CodeInput />
    </main>
  );
}
