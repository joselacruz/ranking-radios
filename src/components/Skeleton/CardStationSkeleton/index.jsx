import React from "react";
import { Skeleton, Card, Box } from "@mui/material";

const CardStationSkeleton = () => {
  return (
    <Card sx={{ width: { xs: "120px", sm: "150px" }, height: 210 }}>
      <Skeleton
        variant="rectangular"
        height={120}
        width="100%"
      />
      <Box
        sx={{
          marginInlineStart: "10px",
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        <Skeleton
          variant="text"
          width="80%"
        />
        <Skeleton
          variant="text"
          width="10%"
        />
        <Skeleton
          variant="text"
          width="40%"
        />
      </Box>
    </Card>
  );
};

export { CardStationSkeleton };
