import { Box, Typography } from "@mui/material";
import { StarInCircleIcon } from "../StarInCircleIcon";
const Logo = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      alignItems="end"
    >
      <Typography
        variant="subtitle2"
        component="span"
        fontStyle="oblique"
        fontWeight="bolder"
        translate="no"
        color="#FFA500"
        sx={{ marginInlineEnd: "2px" }}
      >
        Ranking
      </Typography>
      <StarInCircleIcon size={"24px"} />
      <Typography
        variant="subtitle2"
        component="span"
        color="#FFA500"
        translate="no"
      >
        Radios
      </Typography>
    </Box>
  );
};

export { Logo };
