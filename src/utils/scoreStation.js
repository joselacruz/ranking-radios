const maxVotes = 161733; // La máxima cantidad de votos entre todas las estaciones

  // Calcula la puntuación de popularidad en una escala del 1 al 10

  

  // Redondear la puntuación si es menor a 10, de lo contrario, mantener 2 decimal
  // y si es mayor a 10 mostrar 10 uso un numero de votacion maximo 
  // para tener un equilibrio  y  mostrar algo bonito para las estaciones que no tiene tantos votos

   const calcScore = ({stationVotes}) => {

    const popularityScore = (stationVotes / maxVotes) * 10;
    let result;
    if (popularityScore < 10) {
      result = popularityScore.toFixed(2);
    } else if (popularityScore > 10) {
      result = 10;
    } else {
      result = popularityScore.toFixed(0);
    }

    return result;
  };

  export {calcScore}