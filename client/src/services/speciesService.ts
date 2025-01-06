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

export { getAllSpecies };
