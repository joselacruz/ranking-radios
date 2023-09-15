import { Layout } from "../../components/Layout";
import { ContainedStations } from "../../container/ContainedStations";
import { useData } from "../../hooks/useData";
import { ContainedStationsSkeleton } from "../../components/Skeleton/ContainedStationsSkeleton";
import { RadioPlayer } from "../../components/RadioPlayer";

const Home = () => {
  const [stationTopVote, setStationTopVote] = useData({
    endpoint: "json/stations/topvote",
    limit: "1",
  });

  const [stationTopClick, setStationTopClick] = useData({
    endpoint: "json/stations/topclick",
    limit: "1",
  });

  function useRenderStations({ stations, titulo }) {
    if (stations.length > 0) {
      return (
        <ContainedStations
          titulo={titulo}
          stations={stations}
        />
      );
    } else {
      return <ContainedStationsSkeleton />;
    }
  }

  return (
    <Layout>
      {useRenderStations({
        stations: stationTopVote,
        titulo: "Top 10 Radio Stations By Votes",
      })}
      {useRenderStations({
        stations: stationTopClick,
        titulo: "Top 10 Most Visited Stations",
      })}
      <RadioPlayer />
    </Layout>
  );
};

export { Home };
