import { instance } from "../api/axiosConfig";
import { ISpecies } from "../interfaces/ISpecies";

const getAllSpecies = async (): Promise<ISpecies[]> => {
  try {
    return instance.get("/species");
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

export { getAllSpecies, getSpecies };
