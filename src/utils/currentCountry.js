import { makeServerRequest } from './serverRequestUtil';

const TOKEN = import.meta.env.VITE_API_TOKEN_IPINFO;
export async function getCountryIsoByIp() {
  try {
    const response = await fetch(`https://ipinfo.io/?token=${TOKEN}`);
    const isoCountry = await response.json();
    return isoCountry.country;
  } catch (error) {
    console.error('error al obtener el pais actual', error);
  }
}

export async function getObjCountry() {
  try {
    const findCountry = await getCountryIsoByIp();
    const response = await makeServerRequest({
      endpoint: `json/countries/${findCountry}`,
      limit: 1,
    });
    return response[0];
  } catch (error) {
    console.error('error al obtener ', error);
  }
}
