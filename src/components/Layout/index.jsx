import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{ marginLeft: "250px", p: 3, paddingBottom: "180px" }}
    >
      {children}
    </Box>
  );
};

export { Layout };
