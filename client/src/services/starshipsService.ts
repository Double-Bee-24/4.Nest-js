import { instance } from "../api/axiosConfig";
import IStarship from "../interfaces/IStarships";

const getAllStarships = async (): Promise<IStarship[]> => {
  try {
    return instance.get("/starships");
  } catch (error) {
    console.error("'getAllStarships' - error trying get data: ", error);

    return [];
  }
};

export { getAllStarships };
