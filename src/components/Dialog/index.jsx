import { Dialog, Button, Box, DialogContent } from "@mui/material";
import { PlayPauseIcon } from "../PlayPauseIcon";

const DialogClickStation = ({ open, onClose, station, stationNav }) => {
  function handleClose() {
    onClose();
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      backdropclick="true"
      maxWidth="400px"
    >
      <DialogContent>
        <figure
          style={{
            width: "200px",
            height: "200px",
            margin: 0,
            position: "relative",
          }}
        >
          <img
            src={station.favicon}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </figure>
        <div
          style={{
            position: "absolute",
            top: "calc(50% - 58px)",
            right: "calc(50% - 34px)",
            backgroundColor: "rgb(255 255 255 / 84%)",
            borderRadius: "50%",
          }}
        >
          <PlayPauseIcon station={station} />
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <Button
            onClick={handleClose}
            color="secondary"
          >
            Close down
          </Button>
          <Button
            variant="contained"
            onClick={stationNav}
            color="secondary"
          >
            Visit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export { DialogClickStation };
