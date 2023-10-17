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
  { name: "K-Pop", color: "#696969" },
  { name: "Remix", color: "#A52A2A" },
  { name: "House", color: "#D2691E" },
  { name: "Christmas", color: "#FF0000" },
  { name: "J-Pop", color: "#006400" },
  { name: "Classic", color: "#000000" },
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
            translate="no"
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
    setSelectGender(genderName);
    loadData({ queryParam: "tag", value: genderName });
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
              key={gender.name}
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
