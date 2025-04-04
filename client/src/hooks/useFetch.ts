import { useEffect, useState } from "react";
import { IEntityResponse } from "../interfaces/IEntityResponse";

/**
 *
 * @param fetchFunction requested to the server function
 * @returns fetched data
 */
function useFetch<T>(
  fetchFunction: () => Promise<IEntityResponse<T>>
): IEntityResponse<T> | undefined {
  const [data, setData] = useState<IEntityResponse<T>>();

  useEffect(() => {
    (async function () {
      try {
        const entityData: IEntityResponse<T> = await fetchFunction();

        setData(entityData);
      } catch (error) {
        console.error("'useFetch' performing error: ", error);
      }
    })();
  }, []);

  return data;
}

export { useFetch };
