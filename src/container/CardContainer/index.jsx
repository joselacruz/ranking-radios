import { Box } from "@mui/material";

const CardContainer = ({ children, flexDirection = "row" }) => {
  return (
    <Box
      display="flex"
      flexDirection={flexDirection}
      justifyContent="start"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
    >
      {children}
    </Box>
  );
};
export { CardContainer };
