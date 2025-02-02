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

const uploadPlanetAvatar = async (id: number, file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await instance.post(`/planets/upload/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error performing uploadPlanetAvatar function: ", error);

    return {} as IPlanet;
  }
};

export { getAllPlanets, getPlanet, uploadPlanetAvatar };
