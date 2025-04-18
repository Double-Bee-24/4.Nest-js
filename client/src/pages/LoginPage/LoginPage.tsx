import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auhtService";
import styles from "./LoginPage.module.scss";

export default function Login(): JSX.Element {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(value, "value");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginStatus = await login(formData);

    if (loginStatus === "success") {
      navigate("/admin");
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
        </form>
      </div>
    </div>
  );
}
