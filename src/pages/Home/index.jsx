import { Layout } from "../../components/Layout";
import { ContainedStations } from "../../container/ContainedStations";
import { useData } from "../../utils/useData";
import { ContainedStationsSkeleton } from "../../components/Skeleton/ContainedStationsSkeleton";

const Home = () => {
  const [stationTopVote, setStationTopVote] = useData({
    endpoint: "json/stations/topvote",
    limit: "5",
  });

  function useRenderStations({ stations }) {
    if (stations.length > 0) {
      return (
        <ContainedStations
          titulo={"Top 10 Radio Stations"}
          stations={stations}
        />
      );
    } else {
      return <ContainedStationsSkeleton />;
    }
  }
  // <CardStationSkeleton />

  //   <ContainedStations
  //   titulo={"Top 10 Radio Stations"}
  //   stations={stationTopVote}
  // />
  return <Layout>{useRenderStations({ stations: stationTopVote })}</Layout>;
};

export { Home };
