import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import styles from "./RegisterPage.module.scss";

const RegisterPage = (): JSX.Element => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const registerStatus = await register({
      username: formData.username,
      password: formData.password,
    });

    if (registerStatus === "success") {
      navigate("/");
    }
  };

  return (
    <div className={styles["register-wrapper"]}>
      <div className={styles["register-container"]}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className={styles["register-form"]}>
          <input
            type="text"
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles["auth-input"]}
          />
          {error && <p className={styles["error-text"]}>{error}</p>}
          <button type="submit" className={styles["register-button"]}>
            Sign Up
          </button>
          <p className={styles["login-redirect"]}>
            Already have an account? <Link to="/login">Log in</Link>
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
};

export default RegisterPage;
