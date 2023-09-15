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
export async function makeServerRequest({ endpoint, limit }) {
  const timeoutMs = 10000; // 10 segundos (ajusta este valor según tus necesidades)

  for (const server of serverList) {
    const serverUrl = server.url;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort(); // Abortar la solicitud si supera el límite de tiempo
      }, timeoutMs);

      const response = await fetch(`${serverUrl}${endpoint}?limit=${limit}`, {
        signal: controller.signal, // Asociar el controlador de aborto a la solicitud
      });

      clearTimeout(timeoutId); // Limpiar el temporizador si la solicitud se completa a tiempo

      if (response.ok) {
        const data = await response.json();
        const parsed = data.map((item) => {
          const tagsArray = item.tags.split(',').map((tag) => tag.trim());
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