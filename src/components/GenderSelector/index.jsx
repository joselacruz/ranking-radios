import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";

const genderList = [
  { name: "Pop", color: "#C71585" },
  { name: "Dance", color: "#FF8C00" },
  { name: "Rock", color: "#BDB76B" },
  { name: "Hip-Hop", color: "#FF00FF" },
  { name: "Urban", color: "#00BFFF" },
  { name: "Latin", color: "#8B008B" },
  { name: "Country", color: "#483D8B" },
  { name: "Rock Indie", color: "#2E8B57" },
  { name: "Cristian", color: "#00FFFF" },
  { name: "Kids", color: "#FF4500" },
];
const GenderCard = ({ name, color, handleClick }) => {
  return (
    <Card
      onClick={handleClick}
      sx={{
        width: "130px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(to left bottom, ${color}, #18191B)`,
      }}
      elevation={8}
    >
      <CardActionArea>
        <CardContent>
          <Typography
            variant="subtitle1"
            textAlign={"center"}
            fontWeight={"bold"}
            color={"white"}
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const GenderSelector = ({ loadData, setSelectGender }) => {
  const loadDataByGender = (genderName) => {
    loadData({ queryParam: "tag", value: genderName });
    setSelectGender(genderName);
  };
  return (
    <>
      <Typography
        variant="h6"
        gutterBottom
      >
        What do you want to listen?
      </Typography>
      <Box
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {/* card de generos */}
        {genderList.map((gender) => {
          return (
            <GenderCard
              name={gender.name}
              color={gender.color}
              gender
              handleClick={() => loadDataByGender(gender.name)}
            />
          );
        })}
      </Box>
    </>
  );
};
export { GenderSelector };
