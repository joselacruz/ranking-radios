import { PlayerContext } from "../../context/PlayerContext";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { CircularProgress, IconButton } from "@mui/material";
import { useContext } from "react";

const PlayPauseIcon = ({ station }) => {
  const context = useContext(PlayerContext);

  function stationExistInContext(stationIdentifier) {
    if (context.streamInfo?.stationuuid == stationIdentifier) {
      return true;
    } else {
      return false;
    }
  }

  const renderIcon = () => {
    const styles = {
      fontSize: "58px",
    };

    if (stationExistInContext(station.stationuuid)) {
      if (context.play) {
        if (context.inReproduction) {
          return <StopCircleIcon sx={styles} />;
        } else {
          return <CircularProgress sx={styles} />;
        } // Mueve esta llave al mismo nivel que el return de CircularProgress
      } else {
        return <PlayCircleOutlineIcon sx={styles} />;
      }
    } else {
      return <PlayCircleOutlineIcon sx={styles} />;
    }
  };

  const sendToStream = () => {
    if (stationExistInContext(station.stationuuid)) {
      context.setPlay(!context.play);
    }
    //si ya esta repoduciendo una estacion actualizamos con la nueva  estacion de radio
    // a reproducir
    else {
      context.setStreamInfo(station);
      context.setPlay(true);
    }
  };

  return (
    <IconButton
      color="primary"
      onClick={sendToStream}
      disabled={!context.inReproduction && context.play}
    >
      {renderIcon()}
    </IconButton>
  );
};
export { PlayPauseIcon };
