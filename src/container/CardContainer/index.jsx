import { Box } from "@mui/material";

const CardContainer = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
      sx={{
        justifyContent: {
          xs: "center",
          sm: "start",
        },
      }}
    >
      {children}
    </Box>
  );
};
export { CardContainer };
