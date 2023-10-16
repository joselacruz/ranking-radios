import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { StationContext } from "../../context/StationContext";
import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import "./VoteIcon.css";

const VoteIcon = ({ station }) => {
  const context = useContext(StationContext);
  const [animate, setAnimate] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  /**
   * Incrementa el número de votos de una estación y actualiza los contextos correspondientes.
   */
  const incrementVote = async () => {
    setAnimate(true);

    try {
      // Realiza una solicitud para incrementar los votos en el servidor de Radio Browser
      const response = await fetch(
        `https://nl1.api.radio-browser.info/json/vote/${station.stationuuid}`
      );

      // Parsea la respuesta como JSON
      const data = await response.json();

      // si data ok es true es porque el voto es exitoso solo se puede votar cada 10 minutos
      // si es false el incremento del voto no ocurre
      if (data.ok) {
        // Calcula el nuevo valor para los votos
        const newVote = station.votes + 1;

        // Actualiza el contexto con el nuevo valor de votos a la estación correspondiente
        await context.updateVotes({
          newVote: newVote,
          stationId: station.stationuuid,
        });

        enqueueSnackbar(
          "Your vote has been registered. We appreciate your participation!",
          {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          }
        );
      } else {
        enqueueSnackbar(
          "You have already voted you can only vote every 10 minutes",
          {
            variant: "warning",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        "Sorry we are having trouble registering your vote at this time",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
    }

    setTimeout(() => {
      setAnimate(false);
    }, 1000); // Ajusta el tiempo según la duración de la animación
  };

  return (
    <IconButton
      onClick={incrementVote}
      className={animate ? "animated" : ""}
    >
      <ThumbUpIcon sx={{ fontSize: "28px" }} />
    </IconButton>
  );
};
export { VoteIcon };
