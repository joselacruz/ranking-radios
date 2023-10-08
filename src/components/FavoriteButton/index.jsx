import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext, useEffect, useState } from "react";
import { StationContext } from "../../context/StationContext";

const FavoriteButton = ({ size, station }) => {
  const context = useContext(StationContext);

  // Estado local para el color del botón
  const [color, setColor] = useState("");

  // Manejar la acción de agregar o quitar de favoritos
  const handleFavorite = () => {
    // Si el color es "primary", la estación ya está en favoritos
    if (color === "primary") {
      setColor("");
      // Llamar a la función en el contexto para quitar la estación de favoritos
      context.removeFavorite(station);
    } else {
      // Si el color no es "primary", la estación no está en favoritos
      setColor("primary");

      // Llamar a la función en el contexto para agregar la estación a favoritos
      context.addFavorite(station);
    }
  };

  useEffect(() => {
    // Efecto para establecer el color cuando la estación ya está en favoritos al renderizar
    if (context.isExistInfavorite(station.stationuuid)) {
      setColor("primary");
    } else {
      setColor("");
    }
  }, [context.favorites]);

  // Renderizar el botón de favoritos con el ícono y tamaño proporcionados
  return (
    <IconButton
      onClick={handleFavorite}
      color={color}
    >
      <FavoriteIcon
        color="red"
        sx={{ fontSize: size }}
      />
    </IconButton>
  );
};

export { FavoriteButton };
