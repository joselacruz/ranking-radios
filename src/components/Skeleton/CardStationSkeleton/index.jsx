import React from "react";
import { Skeleton, Card, Box } from "@mui/material";

const CardStationSkeleton = () => {
  return (
    <Card sx={{ width: 150, height: 210 }}>
      <Skeleton
        variant="rectangular"
        width={150}
        height={120}
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
