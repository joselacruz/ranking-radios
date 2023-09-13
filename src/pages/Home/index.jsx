import { Layout } from "../../components/Layout";
import { ContainedStations } from "../../container/ContainedStations";
import { useData } from "../../hooks/useData";
import { ContainedStationsSkeleton } from "../../components/Skeleton/ContainedStationsSkeleton";

const Home = () => {
  const [stationTopVote, setStationTopVote] = useData({
    endpoint: "json/stations/topvote",
    limit: "5",
  });

  const [stationTopClick, setStationTopClick] = useData({
    endpoint: "json/stations/lastclick",
    limit: "5",
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
    </Layout>
  );
};

export { Home };
