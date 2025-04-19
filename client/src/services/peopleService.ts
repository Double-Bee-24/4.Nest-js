// import typia from "typia";
import { adminInstance, instance } from "../api/axiosConfig";
import { IEntityResponse } from "../interfaces/IEntityResponse";
import { IPerson } from "../interfaces/IPerson";

const getAllPeople = async (
  page = 1,
  limit = 10
): Promise<IEntityResponse<IPerson> | null> => {
  try {
    const response: IEntityResponse<IPerson> = await instance.get("/people", {
      params: { page, limit },
    });

    return response;
  } catch (error) {
    console.error("Error performing getAllPeople function: ", error);
    return null;
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

const createPerson = async (): Promise<void> => {
  try {
    const testPerson = {
      name: "Luke Skywalker",
      description: "Jedi Master and hero of the Clone Wars",
      height: "180",
      mass: "75",
      hairColor: "Blond",
      skinColor: "Fair",
      eyeColor: "Blue",
      birthYear: "17BBY",
      gender: "Male",
      homeworld: 123,
    };
    const data: IPerson = await adminInstance.post("/people", testPerson);

    console.log(data);
  } catch (error) {
    console.error("Error performing createPerson function: ", error);
  }
};

export { getAllPeople, getPerson, uploadPersonAvatar, createPerson };
