import { makeServerRequest } from "./serverRequestUtil";

export async function getCountryIsoByIp () {
   try{
     const response = await fetch('https://ipinfo.io/?token=7876d82de26f3f');
     const isoCountry = await response.json();
     return isoCountry.country
   }catch(error){
    console.error('error al obtener el pais actual', error);
   }
}

export async function getObjCountry () {
    try{
     const findCountry = await getCountryIsoByIp();
     const response = await makeServerRequest({
        endpoint: `json/countries/${findCountry}`,
        limit: 1,
      });
    return response[0];
    }
    catch(error){
        console.error('error al obtener ', error);
       }
}