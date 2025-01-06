import { instance } from "../api/axiosConfig";
import { IPlanet } from "../interfaces/IPlanet";

const getAllPlanets = async (): Promise<IPlanet[]> => {
  try {
    return instance.get("/planets");
  } catch (error) {
    console.error("'getAllPlanets' - error trying get data: ", error);

    return [];
  }
};

export { getAllPlanets };
