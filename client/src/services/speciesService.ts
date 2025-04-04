import { instance } from "../api/axiosConfig";
import { IEntityResponse } from "../interfaces/IEntityResponse";
import { ISpecies } from "../interfaces/ISpecies";

const getAllSpecies = async (page = 1, limit = 10): Promise<ISpecies[]> => {
  try {
    const response: IEntityResponse<ISpecies> = await instance.get("/species", {
      params: { page, limit },
    });

    return response.entityData;
  } catch (error) {
    console.error("'getAllSpecies' - error trying get data: ", error);

    return [];
  }
};

const getSpecies = async (id: number): Promise<ISpecies> => {
  try {
    const data: ISpecies = await instance.get(`/species/${id}`);

    return data;
  } catch (error) {
    console.error("Error performing getSpecies function: ", error);

    return {} as ISpecies;
  }
};

const uploadSpeciesAvatar = async (id: number, file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await instance.post(`/species/upload/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error performing uploadSpeciesAvatar function: ", error);

    return {} as ISpecies;
  }
};

export { getAllSpecies, getSpecies, uploadSpeciesAvatar };
