import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import WebIcon from "@mui/icons-material/Web";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const commonListItemStyles = {
  alignItems: "start",
  gap: 1,
};

const commonListItemTextStyles = {
  margin: "0",
};

const RadioStationInfoCard = ({ stationInfo }) => {
  const { location, language, website, genders, votes, codec, bitrate } =
    stationInfo;

  return (
    <Card sx={{ marginTop: "20px" }}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
        >
          Radio Station Information
        </Typography>
        <List>
          <ListItem sx={commonListItemStyles}>
            <LocationOnIcon />
            <ListItemText
              primary="Location"
              secondary={location}
              sx={commonListItemTextStyles}
            />
          </ListItem>
          <ListItem sx={commonListItemStyles}>
            <LanguageIcon />
            <ListItemText
              primary="Language"
              secondary={language}
              sx={commonListItemTextStyles}
            />
          </ListItem>
          <ListItem sx={commonListItemStyles}>
            <WebIcon />
            <ListItemText
              primary="Website"
              secondary={website}
              sx={commonListItemTextStyles}
            />
          </ListItem>
          <ListItem sx={commonListItemStyles}>
            <PublicIcon />
            <ListItemText
              primary="Genders"
              secondary={genders.join(", ")}
              sx={commonListItemTextStyles}
            />
          </ListItem>
          <ListItem sx={commonListItemStyles}>
            <ThumbUpOffAltIcon />
            <ListItemText
              primary="Votes"
              secondary={votes.toLocaleString()}
              sx={commonListItemTextStyles}
            />
          </ListItem>
          <ListItem sx={commonListItemStyles}>
            <GraphicEqIcon />
            <ListItemText
              primary="Codec"
              secondary={codec}
              sx={commonListItemTextStyles}
            />
          </ListItem>
          <ListItem sx={commonListItemStyles}>
            <MusicNoteIcon />
            <ListItemText
              primary="Bitrate"
              secondary={`${bitrate} kbps`}
              sx={commonListItemTextStyles}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export { RadioStationInfoCard };
