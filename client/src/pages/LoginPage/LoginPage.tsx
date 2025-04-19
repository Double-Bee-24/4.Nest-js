import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import styles from "./LoginPage.module.scss";

export default function Login(): JSX.Element {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginStatus = await login(formData);

    if (loginStatus === "success") {
      navigate("/");
    }
  };

  return (
    <div className={styles["login-wrapper"]}>
      <div className={styles["login-container"]}>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit} className={styles["register-form"]}>
          <input
            type="login"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={styles["auth-input"]}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={styles["auth-input"]}
          />
          <button className={styles["register-button"]}>Log In</button>
          <p className={styles["switch-auth"]}>
            Don’t have an account?{" "}
            <Link to="/register" className={styles["link"]}>
              Register here
            </Link>
          </p>
          <p className={styles["switch-auth"]}>
            <Link to="/" className={styles["link"]}>
              {"<-"} Back to Home
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
