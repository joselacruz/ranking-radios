import { useEffect, useState } from "react";
import { makeServerRequest } from "../utils/serverRequestUtil";
import { updateFavicons } from "../utils/updateFavicoins";
import { extractImgFromUrl } from "../utils/extractImgFromUrl";
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
  }, [endpoint,limit]);

  useEffect(() => {
    updateFavicons({dataToUpdate:data, setdataToUpdate:setData})
  }, [data]);


  return [data, setData];
};
