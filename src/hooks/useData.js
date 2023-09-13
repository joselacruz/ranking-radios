import { useEffect, useState } from "react";
import { makeServerRequest } from "../utils/serverRequestUtil";
import { useFetchFavicon } from "./useFetchFavicon";
export const useData = ({endpoint,limit}) => {
    
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await makeServerRequest({
          endpoint,
          limit,
        });
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [endpoint, limit]);
  useFetchFavicon(data,setData)
  return [data, setData];
};
