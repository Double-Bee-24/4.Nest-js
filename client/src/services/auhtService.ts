import { instance } from "../api/axiosConfig";

const login = async (credentials: {
  username: string;
  password: string;
}): Promise<string> => {
  try {
    const response = await instance.post("/auth/login", credentials, {
      withCredentials: true,
    });

    console.log(response);

    return "success";
  } catch (error) {
    console.error("Error while fetching books: ", error);
    return "unseccess";
  }
};

export { login };
