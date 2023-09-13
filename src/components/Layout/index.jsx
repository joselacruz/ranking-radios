import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{ marginLeft: "250px", p: 3 }}
    >
      {children}
    </Box>
  );
};

export { Layout };
