// import typia from "typia";
import { instance } from "../api/axiosConfig";
import IPerson from "../interfaces/IPerson";

// const validatePerson = typia.createValidate<IPerson>();

const getAllPeople = async (): Promise<IPerson[]> => {
  try {
    return instance.get("/people");
  } catch (error) {
    console.error("Error performing getAllPeople function: ", error);

    return [];
  }
};

// const getImage = async (): Promise<void> => {
//   try {
//     const data = await instance.get("/people/image");
//   } catch (error) {
//     console.error("Error performing getImage function: ", error);
//   }
// };

const getPerson = async (id: number): Promise<IPerson> => {
  try {
    const data: IPerson = await instance.get(`/people/${id}`);

    return data;
  } catch (error) {
    console.error("Error performing getPerson function: ", error);

    return {} as IPerson;
  }
};

export { getAllPeople, getPerson };
