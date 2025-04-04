import { useEffect, useState } from "react";

/**
 *
 * @param fetchFunction requested to the server function
 * @returns fetched data
 */
function useFetch<T>(fetchFunction: () => Promise<T>): T | undefined {
  const [data, setData] = useState<T>();

  useEffect(() => {
    (async function () {
      try {
        const entityData = await fetchFunction();

        setData(entityData);
      } catch (error) {
        console.error("'useFetch' performing error: ", error);
      }
    })();
  }, []);

  return data;
}

export { useFetch };
