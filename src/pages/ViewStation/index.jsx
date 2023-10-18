import { Layout } from "../../components/Layout";
import { Box, Container, Typography, Stack } from "@mui/material";
import { StationContext } from "../../context/StationContext";
import { useContext, useEffect, useState } from "react";
import { PlayPauseIcon } from "../../components/PlayPauseIcon";
import { FavoriteButton } from "../../components/FavoriteButton";
import { RadioStationInfoCard } from "../../components/RadioStationInfoCard";
import { VoteIcon } from "../../components/VoteIcon";
import { makeServerRequest } from "../../utils/serverRequestUtil";

const ViewStation = () => {
  const context = useContext(StationContext);
  // Estado local para manejar la carga de votos
  const [loadingVotes, setLoadingVotes] = useState(true);

  // Objeto con información de la estación para mostrar en la interfaz de usuario
  const stationInfo = {
    location: context.stationDetails.country || "undefined",
    language: context.stationDetails.language || "undefined",
    website: context.stationDetails.homepage || "undefined",
    genders: context.stationDetails.tags || "undefined",
    votes: loadingVotes
      ? "charging..." // Muestra este mensaje mientras se obtienen los votos reales
      : context.stationDetails.votes.toLocaleString() || "undefined",
    codec: context.stationDetails.codec || "undefined",
    bitrate: context.stationDetails.bitrate || "undefined",
  };

  // Función asincrónica para obtener los votos reales desde la API
  async function fetchActualVotes() {
    try {
      // Identificador único de la estación
      const identifier = context.stationDetails.stationuuid;

      // Realiza la solicitud a la API para obtener la información más reciente de la estación
      const response = await makeServerRequest({
        endpoint: `json/stations/byuuid/${identifier}`,
        limit: 1,
      });

      // Obtiene el número actual de votos desde la respuesta de la API
      const currentVoteServer = response[0].votes;

      // Compara los votos actuales con los almacenados en el contexto y actualiza si es necesario
      if (currentVoteServer !== context.stationDetails.votes) {
        context.setStationDetails((prevState) => ({
          ...prevState,
          votes: currentVoteServer,
        }));
      }
    } catch (error) {
      // Maneja errores durante la solicitud e imprime detalles en la consola
      console.error("Error fetching actual votes:", error);
    } finally {
      setLoadingVotes(false); // Cuando la solicitud termina, establece loading en false
    }
  }

  // Efecto secundario que se ejecuta después del montaje del componente
  useEffect(() => {
    fetchActualVotes(); // Inicia la obtención de votos al montar el componente
  }, []); // La dependencia vacía indica que solo se ejecuta una vez al montar el componente

  // Renderiza la interfaz de usuario con la información de la estación y botones de interacción
  return (
    <Layout>
      <Container maxWidth={"md"}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 2,
          }}
        >
          <figure
            style={{
              width: "192px",
              height: "192px",
              padding: "0",
              margin: "0",
              boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
            }}
          >
            <img
              src={context.stationDetails.favicon}
              alt={context.stationDetails.name}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </figure>

          <div>
            <Typography
              variant="h5"
              fontWeight={"bold"}
              gutterBottom
            >
              {context.stationDetails.name}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
            >
              {`${stationInfo.votes} Votes`}
            </Typography>
          </div>
        </Box>

        {/* Botones */}
        <Stack
          direction="row"
          spacing={2}
          marginTop={2}
          alignItems="center"
        >
          <PlayPauseIcon station={context.stationDetails} />

          <FavoriteButton
            size="28px"
            station={context.stationDetails}
          />
          <VoteIcon station={context.stationDetails} />
        </Stack>

        <RadioStationInfoCard stationInfo={stationInfo} />
      </Container>
    </Layout>
  );
};

export { ViewStation };
