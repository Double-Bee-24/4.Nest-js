import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header(): JSX.Element {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  const handleNavigateRegister = () => {
    navigate("/register");
  };

  return (
    <header className={styles["header"]}>
      <div className={styles["heading-wrapper"]} onClick={handleNavigateHome}>
        <img
          src="/satellite.png"
          alt="satellite icon"
          className="header-logo"
        />
        <h2>Starwars universe</h2>
      </div>
      <div className={styles["auth-wrapper"]}>
        <p onClick={handleNavigateLogin}>Log in</p>
        <p>|</p>
        <p onClick={handleNavigateRegister}>Register</p>
      </div>
    </header>
  );
}
