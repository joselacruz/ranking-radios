import { Box, Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{
        marginLeft: "250px",
        p: 3,
        paddingBottom: "180px",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ display: "grid", gap: "48px" }}
      >
        {children}
      </Container>
    </Box>
  );
};

export { Layout };
