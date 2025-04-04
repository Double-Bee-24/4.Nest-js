import { instance } from "../api/axiosConfig";
import { IEntityResponse } from "../interfaces/IEntityResponse";
import { IVehicle } from "../interfaces/IVehicle";

const getAllVehicles = async (
  page = 1,
  limit = 10
): Promise<IEntityResponse<IVehicle> | null> => {
  try {
    const response: IEntityResponse<IVehicle> = await instance.get(
      "/vehicles",
      {
        params: { page, limit },
      }
    );

    return response;
  } catch (error) {
    console.error("'getAllVehicles' - error trying get data: ", error);

    return null;
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
