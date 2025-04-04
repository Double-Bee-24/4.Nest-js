import { instance } from "../api/axiosConfig";
import { IEntityResponse } from "../interfaces/IEntityResponse";
import { IFilm } from "../interfaces/IFilm";

const getAllFilms = async (page = 1, limit = 10): Promise<IFilm[]> => {
  try {
    const response: IEntityResponse<IFilm> = await instance.get("/films", {
      params: { page, limit },
    });

    return response.entityData;
  } catch (error) {
    console.error("Error performing getAllFilms function: ", error);

    return [];
  }
};

const getFilm = async (id: number): Promise<IFilm> => {
  try {
    const data: IFilm = await instance.get(`/films/${id}`);

    return data;
  } catch (error) {
    console.error("Error performing getFilm function: ", error);

    return {} as IFilm;
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

    return {} as IFilm;
  }
};

export { getAllFilms, getFilm, uploadFilmAvatar };
