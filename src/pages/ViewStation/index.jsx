import { Layout } from "../../components/Layout";
import { Box, Container, Typography, IconButton, Stack } from "@mui/material";
import { StationContext } from "../../context/StationContext";
import { useContext } from "react";
import { PlayPauseIcon } from "../../components/PlayPauseIcon";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { RadioStationInfoCard } from "../../components/RadioStationInfoCard";

const ViewStation = () => {
  const context = useContext(StationContext);

  const stationInfo = {
    location: context.stationDetails.country || "undefined",
    language: context.stationDetails.language || "undefined",
    website: context.stationDetails.homepage || "undefined",
    genders: context.stationDetails.tags || "undefined",
    votes: context.stationDetails.votes.toLocaleString() || "undefined",
    codec: context.stationDetails.codec || "undefined",
    bitrate: context.stationDetails.bitrate || "undefined",
  };

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

          <IconButton>
            <FavoriteIcon sx={{ fontSize: "28px" }} />
          </IconButton>
          <IconButton>
            <ThumbUpIcon sx={{ fontSize: "28px" }} />
          </IconButton>
        </Stack>

        <RadioStationInfoCard stationInfo={stationInfo} />
      </Container>
    </Layout>
  );
};

export { ViewStation };
