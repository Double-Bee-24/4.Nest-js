import { instance } from "../api/axiosConfig";
import { IEntityResponse } from "../interfaces/IEntityResponse";
import { IStarship } from "../interfaces/IStarship";

const getAllStarships = async (
  page = 1,
  limit = 10
): Promise<IEntityResponse<IStarship> | null> => {
  try {
    const response: IEntityResponse<IStarship> = await instance.get(
      "/starships",
      {
        params: { page, limit },
      }
    );

    return response;
  } catch (error) {
    console.error("'getAllStarships' - error trying get data: ", error);

    return null;
  }
};

const getStarship = async (id: number): Promise<IStarship> => {
  try {
    const data: IStarship = await instance.get(`/starships/${id}`);

    return data;
  } catch (error) {
    console.error("Error performing getStarship function: ", error);

    return {} as IStarship;
  }
};

const uploadStarshipAvatar = async (id: number, file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await instance.post(`/starships/upload/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error performing uploadStarshipAvatar function: ", error);

    return {} as IStarship;
  }
};

export { getAllStarships, getStarship, uploadStarshipAvatar };
