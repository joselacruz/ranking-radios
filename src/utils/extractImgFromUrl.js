import notFoundImage from '../../public/notfound.jpg';


export async function extractImgFromUrl({ homepageUrl, id, name}) {

  const timeoutMs = 3000; // 5 segundos  para abortar la peticion

//Si la ulr  Esta en Blanco no hace la peticion para obtener imagenes
  if(homepageUrl === '') {
    
    return notFoundImage;
  }
  else{
     try{
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
      controller.abort(); // Abortar la solicitud si supera el límite de tiempo
    }, timeoutMs);

      const response = await fetch(`https://jsonlink.io/api/extract?url=${homepageUrl}`,{
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      const data = await response.json();

      if (data?.images && data.images.length > 0) {
        const  faviconFormJsonLink = data.images[0]
        clearTimeout(timeoutId);
        return faviconFormJsonLink;
       
      }
     


      else if(response.status === 404){
        return notFoundImage;
      }
      else{
      return notFoundImage;
      }
      
     }
     catch(error) {
      return notFoundImage;
      
     }
  }
 
}





// Workerr 


// export async function extractImgFromUrl({ homepageUrl, stationName, setState }) {
//   const controller = new AbortController();
//   const signal = controller.signal;






//   // Configura un temporizador para abortar la solicitud después de 5 segundos
//   const timeoutId = setTimeout(() => {
//     controller.abort();
//   }, 5000);

//   try {
//     const response = await fetch(
//       `https://jsonlink.io/api/extract?url=${homepageUrl}`,
//       { signal }
//     );

//     clearTimeout(timeoutId); // Borra el temporizador si la solicitud se completa antes de 10 segundos



//     let newFavicon;

//     if (response.status === 200) {
//       const data = await response.json();

//       // Verifica si se obtuvo un icono válido
//       if (data?.images && data.images.length > 0) {
//         newFavicon = data.images[0];
//       }
//     }

//     // Actualiza el estado con el nuevo icono o la imagen por defecto
//     setState((prevStations) =>
//       prevStations.map((station) =>
//         station.name === stationName
//           ? { ...station, favicon: newFavicon || "../../public/notfound.jpg" }
//           : station
//       )
//     );
//   } catch (error) {
//     if (error.name === "AbortError") {
//       console.log(`La solicitud fue abortada debido a un tiempo de espera para ${stationName}`);
//     } else {
//       console.log(`Error al obtener icono para ${stationName}:`, error);
//     }
//   }
// }








// // Define una función auxiliar para actualizar el estado  con el nuevo favicon
// function updateStationWithFavicon(prevStations, stationName, newFavicon) {
//   return prevStations.map((station) =>
//     station.name === stationName
//       ? { ...station, favicon: newFavicon || '../../public/notfound.jpg',}
//       : station
//   );
// }


// export async function extractImgFromUrl({ homepageUrl, stationName, setState }) {
//   const controller = new AbortController();
//   const signal = controller.signal;
//   let newFavicon;
  
//   // Verifica si homepageUrl es una cadena válida antes de realizar la solicitud
//   if (homepageUrl.trim() === '') {
//     // Establece la imagen por defecto y no realiza la solicitud
//     return setState((prevStations) => updateStationWithFavicon(prevStations, stationName, newFavicon));

//   }

//   else { 
//     console.log(stationName);
//     const timeoutId = setTimeout(() => {
//       controller.abort();
//     }, 4000);
  
//     try {
//       const response = await fetch(
//         `https://jsonlink.io/api/extract?url=${homepageUrl}`,
//         { signal }
//       );
  
//       clearTimeout(timeoutId); // Borra el temporizador si la solicitud se completa antes de 5 segundos
  
//       if (response.status === 200) {
//         const data = await response.json();
  
//         // Verifica si se obtuvo un icono válido
//         if (data?.images && data.images.length > 0) {
//           newFavicon = data.images[0];
//         } 
//       } else if (response.status === 404) {
//         // Manejar el estado 404 como un error y lanzar una excepción personalizada
//         throw new Error("La página no se encontró (404)");
//       } 
  
//       // Llama a la función auxiliar para actualizar el estado con el nuevo icono
//        setState((prevStations) => updateStationWithFavicon(prevStations, stationName, newFavicon));
//     } catch (error) {
//       // En caso de error, también llama a la función auxiliar para actualizar el estado con la imagen por defecto
//       setState((prevStations) => updateStationWithFavicon(prevStations, stationName, '../../public/notfound.jpg'));
//     }
//   }
//   // Configura un temporizador para abortar la solicitud después de 5 segundos

// }
