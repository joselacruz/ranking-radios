import { Layout } from "../../components/Layout";
import { CardContainerWithSlider } from "../../container/CardContainerWithSlider";
import { useData } from "../../hooks/useData";
import { ContainedStationsSkeleton } from "../../components/Skeleton/ContainedStationsSkeleton";

import { makeServerRequest } from "../../utils/serverRequestUtil";

const Home = () => {
  const [stationTopVote, setStationTopVote] = useData({
    endpoint: "json/stations/topvote",
    limit: "10",
  });

  const [stationTopClick, setStationTopClick] = useData({
    endpoint: "json/stations/topclick",
    limit: "10",
  });

  //Funcion para cargar mas resultados  al llegar al final del slider
  const onLastSlideReached = async (updateMethod) => {
    try {
      if (updateMethod === setStationTopVote) {
        console.log("ocurre");
        const responseNewData = await makeServerRequest({
          endpoint: "json/stations/topvote",
          limit: "3",
          offset: "2",
        });
        updateMethod([...stationTopVote, ...responseNewData]);
      } else if (updateMethod === setStationTopClick) {
        console.log("Reached end of Top Click slider");
        updateMethod({ endpoint: "json/stations/topclick", limit: "5" }); // Actualiza los datos de Top Click
      }
    } catch (error) {}
  };

  function useRenderStations({ stations, titulo, update }) {
    if (stations && stations.length > 0) {
      return (
        <CardContainerWithSlider
          titulo={titulo}
          stations={stations}
          onLastSlideReached={() => onLastSlideReached(update)}
        />
      );
    } else if (stations && stations.length === 0) {
      return <ContainedStationsSkeleton />;
    } else {
      return;
    }
  }

  return (
    <Layout>
      {useRenderStations({
        stations: stationTopVote,
        titulo: "Top 10 Radio Stations By Votes",
        // update: setStationTopVote,
      })}
      {useRenderStations({
        stations: stationTopClick,
        titulo: "Top 10 Most Visited Stations",
      })}

      {!stationTopVote && !stationTopClick && (
        <p>Sorry, we have problems right now, try again later.</p>
      )}
    </Layout>
  );
};

export { Home };
