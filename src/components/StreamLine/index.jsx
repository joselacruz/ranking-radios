import { LinearProgress } from "@mui/material";
import "./index.css";

const StreamLine = ({ isActive }) => {
  return (
    <>
      <LinearProgress
        valueBuffer={1}
        color="secondary"
        sx={{
          width: "70px",
          opacity: isActive ? 1 : 0,
        }}
        className={`custom-opacity-animation ${
          !isActive ? "opacity-hidden" : ""
        }`}
      />
    </>
  );
};

export { StreamLine };
