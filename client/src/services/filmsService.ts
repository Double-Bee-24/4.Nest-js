import { instance } from "../api/axiosConfig";
import { IFilms } from "../interfaces/IFilms";

const getAllFilms = async (): Promise<IFilms[]> => {
  try {
    return instance.get("/films");
  } catch (error) {
    console.error("Error performing getAllFilms function: ", error);

    return [];
  }
};

export { getAllFilms };
