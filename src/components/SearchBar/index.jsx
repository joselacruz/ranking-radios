import { Paper, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

const SearchBar = ({ loadData, setData }) => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false); // Bandera de búsqueda en curso

  useEffect(() => {
    let timeoutId;

    // Función para realizar la búsqueda después de 300 ms de inactividad
    const delayedSearch = () => {
      if (query.trim() !== "") {
        setIsSearching(true);

        timeoutId = setTimeout(() => {
          loadData({ queryParam: "name", value: query });
        }, 300);
      } else {
        // Si la consulta está vacía, borra los resultados
        setData([]);
        setIsSearching(false);
      }
    };

    // Limpia el temporizador si el usuario sigue escribiendo
    clearTimeout(timeoutId);

    // Configura el temporizador para realizar la búsqueda
    delayedSearch();

    // Limpia el temporizador cuando el componente se desmonta o cuando cambia el valor de query
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          justifySelf: "center",
        }}
      >
        <IconButton
          type="submit"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={(event) => {
            event.preventDefault();
            if (!isSearching) {
              setIsSearching(true);
              loadData(query);
            }
          }}
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Radio Stations"
          inputProps={{ "aria-label": "Search Radio Station" }}
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
      </Paper>
    </>
  );
};
export { SearchBar };
