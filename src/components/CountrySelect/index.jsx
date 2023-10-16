import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";

export function CountrySelect({ selectedCountry, setSelectedCountry }) {
  // options del Autocomplete
  const [countries, setCountries] = useState([]);

  //Efecto de React que se ejecuta solo una vez el cual llama a la funcion
  //obtainListCountry para  obtener la lista de Paises
  useEffect(() => {
    obtainListCountry();
  }, []);

  /**
   * obtener la lista de Paises para las opciones de nuestro Autocomplete
   */
  async function obtainListCountry() {
    try {
      const response = await fetch(
        "https://de1.api.radio-browser.info/json/countries"
      );
      const data = await response.json();

      // Eliminar duplicados basados en la propiedad 'name'
      // ya que la respuesta de la api tiene paises duplicados
      const uniqueCountries = data.filter(
        (country, index, self) =>
          index === self.findIndex((c) => c.name === country.name)
      );

      setCountries(uniqueCountries);
    } catch (error) {
      console.error("Error al obtener la lista de países", error);
    }
  }

  return (
    <>
      {countries.length > 0 && (
        <Autocomplete
          id="country-select-demo"
          sx={{ width: 300, justifySelf: "center" }}
          options={countries}
          isOptionEqualToValue={(option, value) =>
            option.name === value.name && option.iso_3166_1 === value.iso_3166_1
          }
          value={selectedCountry}
          onChange={(event, newValue) => setSelectedCountry(newValue)}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                srcSet={`https://flagcdn.com/w40/${option.iso_3166_1.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${option.iso_3166_1.toLowerCase()}.png`}
                alt=""
              />
              {option.name} ({option.iso_3166_1})
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      )}
    </>
  );
}
