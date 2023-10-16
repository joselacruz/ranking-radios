import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/system";

const StarWithCircle = styled("div")(({ size }) => ({
  display: "inline-block",
  position: "relative",
  width: size,
  height: size,
}));

const Circle = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  backgroundColor: theme.palette.divider,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
}));

const ColoredStar = styled(StarIcon)(({ theme }) => ({
  width: `80%`,
  height: `80%`,
  zIndex: 2,
  color: theme.palette.secondary.main,
}));

const StarInCircleIcon = ({ size }) => {
  return (
    <StarWithCircle size={size}>
      <Circle>
        <ColoredStar size={size} />
      </Circle>
    </StarWithCircle>
  );
};

export { StarInCircleIcon };
