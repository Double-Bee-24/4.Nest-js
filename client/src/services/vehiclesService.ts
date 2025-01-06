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

export { getAllVehicles };
