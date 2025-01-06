import { instance } from "../api/axiosConfig";
import IPerson from "../interfaces/IPerson";

const getAllPeople = async (): Promise<IPerson[]> => {
  try {
    return instance.get("/people");
  } catch (error) {
    console.error("Error performing getAllPeople function: ", error);

    return [];
  }
};

export { getAllPeople };
