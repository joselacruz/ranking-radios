import React from "react";
import { Skeleton, Card, Box } from "@mui/material";

const CardStationSkeleton = () => {
  return (
    <Card sx={{ width: 150, height: 250 }}>
      <Skeleton
        variant="rectangular"
        width={150}
        height={155}
      />
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        <Skeleton
          variant="text"
          width="80%"
        />
        <Skeleton
          variant="rectangular"
          width={130}
          height={60}
        />
      </Box>
    </Card>
  );
};

export { CardStationSkeleton };
