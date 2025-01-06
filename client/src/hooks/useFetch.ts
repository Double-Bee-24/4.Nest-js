import { useEffect, useState } from "react";

/**
 *
 * @param fetchFunction requested to the server function
 * @returns fetched data
 */
export default function useFetch<T>(
  fetchFunction: () => Promise<T>
): T | undefined {
  const [data, setData] = useState<T>();

  useEffect(() => {
    (async function () {
      try {
        const receivedPeopleData = await fetchFunction();

        setData(receivedPeopleData);
      } catch (error) {
        console.error("'useFetch' performing error: ", error);
      }
    })();
  }, [fetchFunction]);

  return data;
}
