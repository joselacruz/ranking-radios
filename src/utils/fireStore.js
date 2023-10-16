// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRRVXzPlmQBBmyKt-_mSphkNcbwUNaYS8",
  authDomain: "radio-ranking.firebaseapp.com",
  projectId: "radio-ranking",
  storageBucket: "radio-ranking.appspot.com",
  messagingSenderId: "849651209512",
  appId: "1:849651209512:web:811a294e96f42d4c982c1d",
  measurementId: "G-63PL9XG7XR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

/**
 * Guarda datos en Firestore para un usuario específico, actualizando un array si ya existe o creando uno nuevo si no.
 * @param {Object} param0 - Parámetros de la función.
 * @param {string} param0.userId - Identificador único del usuario.
 * @param {Object} param0.data - Datos a ser guardados.
 */
export const saveFireStore = async ({ nameObj, userId, data }) => {
  try {
    // Verifica si el documento existe llamando a la función 'docExist'
    const check = await docExist({ name: "users", docId: userId });

    if (check) {
      // Si el documento existe, realiza la operación para agregar el elemento al final del array
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, {
        [nameObj]: arrayUnion(data),
      });
    } else {
      // Si el documento no existe, crea un nuevo documento con el array inicializado con 'data'
      await setDoc(doc(db, "users", userId), { [nameObj]: [data] });
    }
  } catch (error) {
    // Maneja errores si ocurren durante el proceso de guardado
    console.error("Error al guardar datos en Firestore:", error);
  }
};
// FIN saveRecentFireStore **

/**
 * Verifica si un documento específico existe en Firestore.
 * @param {Object} param0 - Parámetros de la función.
 * @param {string} param0.name - Nombre de la colección.
 * @param {string} param0.docId - Identificador único del documento.
 * @returns {Promise<boolean>} - Retorna una promesa que resuelve a 'true' si el documento existe, 'false' si no existe o maneja errores.
 */
async function docExist({ name, docId }) {
  const docRef = doc(db, name, docId);

  try {
    const docSnapshot = await getDoc(docRef);

    // Si el documento existe, retorna 'true', si no existe, retorna 'false'
    return docSnapshot.exists();
  } catch (error) {
    // Maneja errores durante la obtención del documento
    console.error("Error al obtener el documento:", error);
    // Retorna 'false' en caso de error para indicar que no existe
    return false;
  }
}
// FIN docExist  **

export const getData = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // Si el documento existe, retorna el array 'recents'
      const userData = docSnapshot.data();
      return userData || [];
    } else {
      // Si el documento no existe, retorna un array vacío
      console.log("El documento no existe.");
      return [];
    }
  } catch (error) {
    // Maneja errores si ocurren durante el proceso de obtención de datos
    console.error("Error al obtener datos de Firestore:", error);
    return [];
  }
};

export const removeItemFireStore = async ({ nameObj, userId, data }) => {
  try {
    const docRef = doc(db, "users", userId);

    // Actualiza el documento, eliminando el elemento del array
    await updateDoc(docRef, {
      [nameObj]: arrayRemove(data),
    });
  } catch (error) {
    console.error("Error al eliminar elemento en Firestore:", error);
  }
};

/**
 * Actualiza el valor de votos para un elemento específico en un array dentro de un documento de Firestore.
 * @param {Object} param0 - Parámetros de la función.
 * @param {string} param0.documentId - Identificador único del documento en Firestore.
 * @param {string} param0.tuArrayFieldName - Nombre del campo de array que contiene los elementos a actualizar.
 * @param {string} param0.idElement - Identificador único del elemento que se actualizará.
 * @param {number} param0.nuevoValor - Nuevo valor para la propiedad 'votes'.
 */
export const updateVotesFireStore = async ({
  documentId,
  tuArrayFieldName,
  idElement,
  nuevoValor,
}) => {
  // Referencia al documento en Firestore
  const docRef = doc(db, "users", documentId);

  try {
    // Obtiene el documento actual
    const doc = await getDoc(docRef);

    // Verifica si el documento existe
    if (doc.exists) {
      // El documento existe, ahora actualizamos el array
      const newArray = doc.data()[tuArrayFieldName].map((item) => {
        // Actualizar solo la propiedad 'votes' del elemento específico
        if (item.stationuuid === idElement) {
          return { ...item, votes: nuevoValor };
        }
        return item;
      });

      // Actualiza el documento en Firestore con el nuevo array
      await updateDoc(docRef, {
        [tuArrayFieldName]: newArray,
      });
    } else {
      // Maneja el caso en el que el documento no existe
      console.log("El documento no existe.");
    }
  } catch (error) {
    // Maneja errores durante la obtención/actualización del documento
    console.error("Error obteniendo/actualizando el documento:", error);
  }
};

// FIN updateVotesFireStore **