import { instance } from "../api/axiosConfig";

interface ILoginResponse {
  access_token: string;
}

const login = async (credentials: { username: string; password: string }) => {
  try {
    const response: ILoginResponse = await instance.post(
      "/auth/login",
      credentials
    );

    localStorage.setItem("access_token", response.access_token);

    return "success";
  } catch (error) {
    console.error("Error during login attempt: ", error);
    return "unsuccess";
  }
};

const register = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const response: ILoginResponse = await instance.post(
      "/auth/register",
      credentials
    );
    localStorage.setItem("access_token", response.access_token);

    return "success";
  } catch (error) {
    console.error("Error during register attempt: ", error);
    return "unsuccess";
  }
};

export { login, register };
