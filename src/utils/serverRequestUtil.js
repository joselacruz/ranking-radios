// serverRequestUtil.js



// Función para obtener la lista de servidores
// export async function getServerList() {
//     try {
//       const response = await fetch('http://all.api.radio-browser.info/json/servers');
//       if (!response.ok) {
//         throw new Error(`La solicitud de servidores no fue exitosa: ${response.status}`);
//       }
//       const serverList = await response.json();
//       return serverList;
//     } catch (error) {
//       console.error('Error al obtener la lista de servidores:', error);
//       return [{url:'http://nl1.api.radio-browser.info/'}];
//     }
//   }
  
  // Función para realizar solicitudes a la API con cada dirección de servidor

  const serverList = [{
    url:'http://nl1.api.radio-browser.info/'},
  {url:'https://de1.api.radio-browser.info/'},
  {url:'https://fr1.api.radio-browser.info/'},
  {url:'https://at1.api.radio-browser.info/'}
]
  export async function makeServerRequest({endpoint,limit}) {

  

    for (const server of serverList) {
      const serverUrl = server.url;
     
      try {
        const response = await fetch(`${serverUrl}${endpoint}?limit=${limit}`);
        
       
        if (response.ok) {
          const data = await response.json();
          const parsed = data.map(item => {
            const tagsArray = item.tags.split(',').map(tag => tag.trim());
            return {
              ...item,
              tags: tagsArray.length > 3 ? tagsArray.slice(0, 3) : tagsArray,
            };
          });


          return parsed; // Retorna los datos si la solicitud fue exitosa
        } else {
          console.error(`La solicitud a ${serverUrl} no fue exitosa: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error al hacer la solicitud a ${serverUrl}: ${error.message}`);
      }
    }
  
    // Si ninguna solicitud fue exitosa, puedes manejarlo aquí
    return null;
  }
  