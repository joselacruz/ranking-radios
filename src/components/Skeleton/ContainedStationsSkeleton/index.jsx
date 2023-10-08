import { Box, Skeleton } from "@mui/material";
import { CardStationSkeleton } from "../CardStationSkeleton";

const ContainedStationsSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Skeleton
        variant="text"
        width={250}
        sx={{
          fontSize: "2.125rem",
          textAlign: "center",
          justifyContent: "center",
        }}
      />

      <Box
        display="flex"
        justifyContent="start"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        {Array.from(new Array(5)).map((item, index) => (
          <CardStationSkeleton key={index} />
        ))}
      </Box>
    </Box>
  );
};
export { ContainedStationsSkeleton };
