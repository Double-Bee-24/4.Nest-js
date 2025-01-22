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

const getPlanet = async (id: number): Promise<IPlanet> => {
  try {
    const data: IPlanet = await instance.get(`/planets/${id}`);

    return data;
  } catch (error) {
    console.error("Error performing getPlanet function: ", error);

    return {} as IPlanet;
  }
};

export { getAllPlanets, getPlanet };
