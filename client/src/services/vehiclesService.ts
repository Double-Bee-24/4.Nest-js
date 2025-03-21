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

const uploadVehicleAvatar = async (id: number, file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await instance.post(`/vehicles/upload/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error performing uploadVehicleAvatar function: ", error);

    return {} as IVehicle;
  }
};

export { getAllVehicles, getVehicle, uploadVehicleAvatar };
