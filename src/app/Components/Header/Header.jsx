import styles from "./Header.module.css";
import BackButton from "../BackButton/BackButton";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <BackButton />
        <Image
          src="/BK_Logo_400.jpg"
          width={170}
          height={137}
          priority={true}
          alt="Buttermilk Kitchen logo"
          className={styles.logo}
        />
        <div className={styles["nav-spacer"]}></div>
      </nav>
    </header>
  );
}
