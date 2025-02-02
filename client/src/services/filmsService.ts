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

const getFilm = async (id: number): Promise<IFilms> => {
  try {
    const data: IFilms = await instance.get(`/films/${id}`);

    return data;
  } catch (error) {
    console.error("Error performing getFilm function: ", error);

    return {} as IFilms;
  }
};

const uploadFilmAvatar = async (id: number, file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await instance.post(`/films/upload/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error performing uploadFilmAvatar function: ", error);

    return {} as IFilms;
  }
};

export { getAllFilms, getFilm, uploadFilmAvatar };
