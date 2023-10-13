import { Box, Container } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const Layout = ({ children }) => {
  const isMobile = useMediaQuery("(max-width:800px)");

  return (
    <Box
      component="main"
      sx={{
        marginLeft: isMobile ? "" : "250px",
        paddingBottom: "180px",
        paddingTop: isMobile ? "90px" : "30px",
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
