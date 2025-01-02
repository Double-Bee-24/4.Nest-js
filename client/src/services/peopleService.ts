import { instance } from "../api/axiosConfig";
import IPerson from "../interfaces/IPerson";

const getAllPeople = async (): Promise<IPerson[]> => {
  try {
    const data: IPerson[] = await instance.get("/");

    return data;
  } catch (error) {
    console.error("Error performing getAllPeople function: ", error);

    return [];
  }
};

export { getAllPeople };
