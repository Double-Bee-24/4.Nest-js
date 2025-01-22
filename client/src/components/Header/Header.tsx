import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header(): JSX.Element {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <header className={styles.header} onClick={handleNavigate}>
      <img src="/satellite.png" alt="satellite icon" className="header-logo" />
      <h2>Starwars universe</h2>
    </header>
  );
}
