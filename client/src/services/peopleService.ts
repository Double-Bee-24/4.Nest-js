// import typia from "typia";
import { instance } from "../api/axiosConfig";
import IPerson from "../interfaces/IPerson";

const getAllPeople = async (page = 1, limit = 10): Promise<IPerson[]> => {
  try {
    return instance.get("/people", { params: { page, limit } });
  } catch (error) {
    console.error("Error performing getAllPeople function: ", error);

    return [];
  }
};

const getPerson = async (id: number): Promise<IPerson> => {
  try {
    const data: IPerson = await instance.get(`/people/${id}`);

    return data;
  } catch (error) {
    console.error("Error performing getPerson function: ", error);

    return {} as IPerson;
  }
};

const uploadPersonAvatar = async (id: number, file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await instance.post(`/people/upload/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error performing uploadPersonAvatar function: ", error);

    return {} as IPerson;
  }
};

export { getAllPeople, getPerson, uploadPersonAvatar };
