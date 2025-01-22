import { instance } from "../api/axiosConfig";
import { IVehicle } from "../interfaces/IVehicles";

const getAllVehicles = async (): Promise<IVehicle[]> => {
  try {
    return instance.get("/vehicles");
  } catch (error) {
    console.error("'getAllVehicles' - error trying get data: ", error);

    return [];
  }
};

const getVehicle = async (id: number): Promise<IVehicle> => {
  try {
    const data: IVehicle = await instance.get(`/vehicles/${id}`);

    return data;
  } catch (error) {
    console.error("Error performing getVehicle function: ", error);

    return {} as IVehicle;
  }
};

export { getAllVehicles, getVehicle };
